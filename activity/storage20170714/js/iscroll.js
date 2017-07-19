(function() {
	// Polyfill MutationObserver
	window.MutationObserver = window.MutationObserver || (function(undefined) {
		"use strict";
		/**
		 * @param {function(Array.<MutationRecord>, MutationObserver)} listener
		 * @constructor
		 */
		function MutationObserver(listener) {
			/**
			 * @type {Array.<Object>}
			 * @private
			 */
			this._watched = [];
			/** @private */
			this._listener = listener;
		}

		/**
		 * Start a recursive timeout function to check all items being observed for mutations
		 * @type {MutationObserver} observer
		 * @private
		 */
		function startMutationChecker(observer) {
			(function check() {
				var mutations = observer.takeRecords();

				if (mutations.length) { // fire away
					// calling the listener with context is not spec but currently consistent with FF and WebKit
					observer._listener(mutations, observer);
				}
				/** @private */
				observer._timeout = setTimeout(check, MutationObserver._period);
			})();
		}

		/**
		 * Period to check for mutations (~32 times/sec)
		 * @type {number}
		 * @expose
		 */
		MutationObserver._period = 30 /*ms+runtime*/ ;

		/**
		 * Exposed API
		 * @expose
		 * @final
		 */
		MutationObserver.prototype = {
			/**
			 * see http:// dom.spec.whatwg.org/#dom-mutationobserver-observe
			 * not going to throw here but going to follow the current spec config sets
			 * @param {Node|null} $target
			 * @param {Object|null} config : MutationObserverInit configuration dictionary
			 * @expose
			 * @return undefined
			 */
			observe: function($target, config) {
				/**
				 * Using slightly different names so closure can go ham
				 * @type {!Object} : A custom mutation config
				 */
				var settings = {
					attr: !!(config.attributes || config.attributeFilter || config.attributeOldValue),

					// some browsers enforce that subtree must be set with childList, attributes or characterData.
					// We don't care as spec doesn't specify this rule.
					kids: !!config.childList,
					descendents: !!config.subtree,
					charData: !!(config.characterData || config.characterDataOldValue)
				};

				var watched = this._watched;

				// remove already observed target element from pool
				for (var i = 0; i < watched.length; i++) {
					if (watched[i].tar === $target) watched.splice(i, 1);
				}

				if (config.attributeFilter) {
					/**
					 * converts to a {key: true} dict for faster lookup
					 * @type {Object.<String,Boolean>}
					 */
					settings.afilter = reduce(config.attributeFilter, function(a, b) {
						a[b] = true;
						return a;
					}, {});
				}

				watched.push({
					tar: $target,
					fn: createMutationSearcher($target, settings)
				});

				// reconnect if not connected
				if (!this._timeout) {
					startMutationChecker(this);
				}
			},

			/**
			 * Finds mutations since last check and empties the "record queue" i.e. mutations will only be found once
			 * @expose
			 * @return {Array.<MutationRecord>}
			 */
			takeRecords: function() {
				var mutations = [];
				var watched = this._watched;

				for (var i = 0; i < watched.length; i++) {
					watched[i].fn(mutations);
				}

				return mutations;
			},

			/**
			 * @expose
			 * @return undefined
			 */
			disconnect: function() {
				this._watched = []; // clear the stuff being observed
				clearTimeout(this._timeout); // ready for garbage collection
				/** @private */
				this._timeout = null;
			}
		};

		/**
		 * Simple MutationRecord pseudoclass. No longer exposing as its not fully compliant
		 * @param {Object} data
		 * @return {Object} a MutationRecord
		 */
		function MutationRecord(data) {
			var settings = { // technically these should be on proto so hasOwnProperty will return false for non explicitly props
				type: null,
				target: null,
				addedNodes: [],
				removedNodes: [],
				previousSibling: null,
				nextSibling: null,
				attributeName: null,
				attributeNamespace: null,
				oldValue: null
			};
			for (var prop in data) {
				if (has(settings, prop) && data[prop] !== undefined) settings[prop] = data[prop];
			}
			return settings;
		}

		/**
		 * Creates a func to find all the mutations
		 *
		 * @param {Node} $target
		 * @param {!Object} config : A custom mutation config
		 */
		function createMutationSearcher($target, config) {
			/** type {Elestuct} */
			var $oldstate = clone($target, config); // create the cloned datastructure

			/**
			 * consumes array of mutations we can push to
			 *
			 * @param {Array.<MutationRecord>} mutations
			 */
			return function(mutations) {
				var olen = mutations.length,
					dirty;

				if (config.charData && $target.nodeType === 3 && $target.nodeValue !== $oldstate.charData) {
					mutations.push(new MutationRecord({
						type: "characterData",
						target: $target,
						oldValue: $oldstate.charData
					}));
				}

				// Alright we check base level changes in attributes... easy
				if (config.attr && $oldstate.attr) {
					findAttributeMutations(mutations, $target, $oldstate.attr, config.afilter);
				}

				// check childlist or subtree for mutations
				if (config.kids || config.descendents) {
					dirty = searchSubtree(mutations, $target, $oldstate, config);
				}

				// reclone data structure if theres changes
				if (dirty || mutations.length !== olen) {
					/** type {Elestuct} */
					$oldstate = clone($target, config);
				}
			};
		}

		/* attributes + attributeFilter helpers */

		// Check if the environment has the attribute bug (#4) which cause
		// element.attributes.style to always be null.
		var hasAttributeBug = document.createElement("i");
		hasAttributeBug.style.top = 0;
		hasAttributeBug = hasAttributeBug.attributes.style.value != "null";

		/**
		 * Gets an attribute value in an environment without attribute bug
		 *
		 * @param {Node} el
		 * @param {Attr} attr
		 * @return {String} an attribute value
		 */
		function getAttributeSimple(el, attr) {
			// There is a potential for a warning to occur here if the attribute is a
			// custom attribute in IE<9 with a custom .toString() method. This is
			// just a warning and doesn't affect execution (see #21)
			return attr.value;
		}

		/**
		 * Gets an attribute value with special hack for style attribute (see #4)
		 *
		 * @param {Node} el
		 * @param {Attr} attr
		 * @return {String} an attribute value
		 */
		function getAttributeWithStyleHack(el, attr) {
			// As with getAttributeSimple there is a potential warning for custom attribtues in IE7.
			return attr.name !== "style" ? attr.value : el.style.cssText;
		}

		var getAttributeValue = hasAttributeBug ? getAttributeSimple : getAttributeWithStyleHack;

		/**
		 * fast helper to check to see if attributes object of an element has changed
		 * doesnt handle the textnode case
		 *
		 * @param {Array.<MutationRecord>} mutations
		 * @param {Node} $target
		 * @param {Object.<string, string>} $oldstate : Custom attribute clone data structure from clone
		 * @param {Object} filter
		 */
		function findAttributeMutations(mutations, $target, $oldstate, filter) {
			var checked = {};
			var attributes = $target.attributes;
			var attr;
			var name;
			var i = attributes.length;
			while (i--) {
				attr = attributes[i];
				name = attr.name;
				if (!filter || has(filter, name)) {
					if (getAttributeValue($target, attr) !== $oldstate[name]) {
						// The pushing is redundant but gzips very nicely
						mutations.push(MutationRecord({
							type: "attributes",
							target: $target,
							attributeName: name,
							oldValue: $oldstate[name],
							attributeNamespace: attr.namespaceURI // in ie<8 it incorrectly will return undefined
						}));
					}
					checked[name] = true;
				}
			}
			for (name in $oldstate) {
				if (!(checked[name])) {
					mutations.push(MutationRecord({
						target: $target,
						type: "attributes",
						attributeName: name,
						oldValue: $oldstate[name]
					}));
				}
			}
		}

		/**
		 * searchSubtree: array of mutations so far, element, element clone, bool
		 * synchronous dfs comparision of two nodes
		 * This function is applied to any observed element with childList or subtree specified
		 * Sorry this is kind of confusing as shit, tried to comment it a bit...
		 * codereview.stackexchange.com/questions/38351 discussion of an earlier version of this func
		 *
		 * @param {Array} mutations
		 * @param {Node} $target
		 * @param {!Object} $oldstate : A custom cloned node from clone()
		 * @param {!Object} config : A custom mutation config
		 */
		function searchSubtree(mutations, $target, $oldstate, config) {
			// Track if the tree is dirty and has to be recomputed (#14).
			var dirty;
			/*
			 * Helper to identify node rearrangment and stuff...
			 * There is no gaurentee that the same node will be identified for both added and removed nodes
			 * if the positions have been shuffled.
			 * conflicts array will be emptied by end of operation
			 */
			function resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes) {
				// the distance between the first conflicting node and the last
				var distance = conflicts.length - 1;
				// prevents same conflict being resolved twice consider when two nodes switch places.
				// only one should be given a mutation event (note -~ is used as a math.ceil shorthand)
				var counter = -~((distance - numAddedNodes) / 2);
				var $cur;
				var oldstruct;
				var conflict;
				while ((conflict = conflicts.pop())) {
					$cur = $kids[conflict.i];
					oldstruct = $oldkids[conflict.j];

					// attempt to determine if there was node rearrangement... won't gaurentee all matches
					// also handles case where added/removed nodes cause nodes to be identified as conflicts
					if (config.kids && counter && Math.abs(conflict.i - conflict.j) >= distance) {
						mutations.push(MutationRecord({
							type: "childList",
							target: node,
							addedNodes: [$cur],
							removedNodes: [$cur],
							// haha don't rely on this please
							nextSibling: $cur.nextSibling,
							previousSibling: $cur.previousSibling
						}));
						counter--; // found conflict
					}

					// Alright we found the resorted nodes now check for other types of mutations
					if (config.attr && oldstruct.attr) findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
					if (config.charData && $cur.nodeType === 3 && $cur.nodeValue !== oldstruct.charData) {
						mutations.push(MutationRecord({
							type: "characterData",
							target: $cur,
							oldValue: oldstruct.charData
						}));
					}
					// now look @ subtree
					if (config.descendents) findMutations($cur, oldstruct);
				}
			}

			/**
			 * Main worker. Finds and adds mutations if there are any
			 * @param {Node} node
			 * @param {!Object} old : A cloned data structure using internal clone
			 */
			function findMutations(node, old) {
				var $kids = node.childNodes;
				var $oldkids = old.kids;
				var klen = $kids.length;
				// $oldkids will be undefined for text and comment nodes
				var olen = $oldkids ? $oldkids.length : 0;
				// if (!olen && !klen) return; // both empty; clearly no changes

				// we delay the intialization of these for marginal performance in the expected case (actually quite signficant on large subtrees when these would be otherwise unused)
				// map of checked element of ids to prevent registering the same conflict twice
				var map;
				// array of potential conflicts (ie nodes that may have been re arranged)
				var conflicts;
				var id; // element id from getElementId helper
				var idx; // index of a moved or inserted element

				var oldstruct;
				// current and old nodes
				var $cur;
				var $old;
				// track the number of added nodes so we can resolve conflicts more accurately
				var numAddedNodes = 0;

				// iterate over both old and current child nodes at the same time
				var i = 0,
					j = 0;
				// while there is still anything left in $kids or $oldkids (same as i < $kids.length || j < $oldkids.length;)
				while (i < klen || j < olen) {
					// current and old nodes at the indexs
					$cur = $kids[i];
					oldstruct = $oldkids[j];
					$old = oldstruct && oldstruct.node;

					if ($cur === $old) { // expected case - optimized for this case
						// check attributes as specified by config
						if (config.attr && oldstruct.attr) /* oldstruct.attr instead of textnode check */ findAttributeMutations(mutations, $cur, oldstruct.attr, config.afilter);
						// check character data if node is a comment or textNode and it's being observed
						if (config.charData && oldstruct.charData !== undefined && $cur.nodeValue !== oldstruct.charData) {
							mutations.push(MutationRecord({
								type: "characterData",
								target: $cur,
								oldValue: oldstruct.charData
							}));
						}

						// resolve conflicts; it will be undefined if there are no conflicts - otherwise an array
						if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);

						// recurse on next level of children. Avoids the recursive call when there are no children left to iterate
						if (config.descendents && ($cur.childNodes.length || oldstruct.kids && oldstruct.kids.length)) findMutations($cur, oldstruct);

						i++;
						j++;
					} else { // (uncommon case) lookahead until they are the same again or the end of children
						dirty = true;
						if (!map) { // delayed initalization (big perf benefit)
							map = {};
							conflicts = [];
						}
						if ($cur) {
							// check id is in the location map otherwise do a indexOf search
							if (!(map[id = getElementId($cur)])) { // to prevent double checking
								// mark id as found
								map[id] = true;
								// custom indexOf using comparitor checking oldkids[i].node === $cur
								if ((idx = indexOfCustomNode($oldkids, $cur, j)) === -1) {
									if (config.kids) {
										mutations.push(MutationRecord({
											type: "childList",
											target: node,
											addedNodes: [$cur], // $cur is a new node
											nextSibling: $cur.nextSibling,
											previousSibling: $cur.previousSibling
										}));
										numAddedNodes++;
									}
								} else {
									conflicts.push({ // add conflict
										i: i,
										j: idx
									});
								}
							}
							i++;
						}

						if ($old &&
							// special case: the changes may have been resolved: i and j appear congurent so we can continue using the expected case
							$old !== $kids[i]
						) {
							if (!(map[id = getElementId($old)])) {
								map[id] = true;
								if ((idx = indexOf($kids, $old, i)) === -1) {
									if (config.kids) {
										mutations.push(MutationRecord({
											type: "childList",
											target: old.node,
											removedNodes: [$old],
											nextSibling: $oldkids[j + 1], // praise no indexoutofbounds exception
											previousSibling: $oldkids[j - 1]
										}));
										numAddedNodes--;
									}
								} else {
									conflicts.push({
										i: idx,
										j: j
									});
								}
							}
							j++;
						}
					} // end uncommon case
				} // end loop

				// resolve any remaining conflicts
				if (conflicts) resolveConflicts(conflicts, node, $kids, $oldkids, numAddedNodes);
			}
			findMutations($target, $oldstate);
			return dirty;
		}

		/**
		 * Utility
		 * Cones a element into a custom data structure designed for comparision. https://gist.github.com/megawac/8201012
		 *
		 * @param {Node} $target
		 * @param {!Object} config : A custom mutation config
		 * @return {!Object} : Cloned data structure
		 */
		function clone($target, config) {
			var recurse = true; // set true so childList we'll always check the first level
			return (function copy($target) {
				var elestruct = {
					/** @type {Node} */
					node: $target
				};

				// Store current character data of target text or comment node if the config requests
				// those properties to be observed.
				if (config.charData && ($target.nodeType === 3 || $target.nodeType === 8)) {
					elestruct.charData = $target.nodeValue;
				}
				// its either a element, comment, doc frag or document node
				else {
					// Add attr only if subtree is specified or top level and avoid if
					// attributes is a document object (#13).
					if (config.attr && recurse && $target.nodeType === 1) {
						/**
						 * clone live attribute list to an object structure {name: val}
						 * @type {Object.<string, string>}
						 */
						elestruct.attr = reduce($target.attributes, function(memo, attr) {
							if (!config.afilter || config.afilter[attr.name]) {
								memo[attr.name] = getAttributeValue($target, attr);
							}
							return memo;
						}, {});
					}

					// whether we should iterate the children of $target node
					if (recurse && ((config.kids || config.charData) || (config.attr && config.descendents))) {
						/** @type {Array.<!Object>} : Array of custom clone */
						elestruct.kids = map($target.childNodes, copy);
					}

					recurse = config.descendents;
				}
				return elestruct;
			})($target);
		}

		/**
		 * indexOf an element in a collection of custom nodes
		 *
		 * @param {NodeList} set
		 * @param {!Object} $node : A custom cloned node
		 * @param {number} idx : index to start the loop
		 * @return {number}
		 */
		function indexOfCustomNode(set, $node, idx) {
			return indexOf(set, $node, idx, JSCompiler_renameProperty("node"));
		}

		// using a non id (eg outerHTML or nodeValue) is extremely naive and will run into issues with nodes that may appear the same like <li></li>
		var counter = 1; // don't use 0 as id (falsy)
		/** @const */
		var expando = "mo_id";

		/**
		 * Attempt to uniquely id an element for hashing. We could optimize this for legacy browsers but it hopefully wont be called enough to be a concern
		 *
		 * @param {Node} $ele
		 * @return {(string|number)}
		 */
		function getElementId($ele) {
			try {
				return $ele.id || ($ele[expando] = $ele[expando] || counter++);
			} catch (o_O) { // ie <8 will throw if you set an unknown property on a text node
				try {
					return $ele.nodeValue; // naive
				} catch (shitie) { // when text node is removed: https://gist.github.com/megawac/8355978 :(
					return counter++;
				}
			}
		}

		/**
		 * **map** Apply a mapping function to each item of a set
		 * @param {Array|NodeList} set
		 * @param {Function} iterator
		 */
		function map(set, iterator) {
			var results = [];
			for (var index = 0; index < set.length; index++) {
				results[index] = iterator(set[index], index, set);
			}
			return results;
		}

		/**
		 * **Reduce** builds up a single result from a list of values
		 * @param {Array|NodeList|NamedNodeMap} set
		 * @param {Function} iterator
		 * @param {*} [memo] Initial value of the memo.
		 */
		function reduce(set, iterator, memo) {
			for (var index = 0; index < set.length; index++) {
				memo = iterator(memo, set[index], index, set);
			}
			return memo;
		}

		/**
		 * **indexOf** find index of item in collection.
		 * @param {Array|NodeList} set
		 * @param {Object} item
		 * @param {number} idx
		 * @param {string} [prop] Property on set item to compare to item
		 */
		function indexOf(set, item, idx, prop) {
			for ( /*idx = ~~idx*/ ; idx < set.length; idx++) { // start idx is always given as this is internal
				if ((prop ? set[idx][prop] : set[idx]) === item) return idx;
			}
			return -1;
		}

		/**
		 * @param {Object} obj
		 * @param {(string|number)} prop
		 * @return {boolean}
		 */
		function has(obj, prop) {
			return obj[prop] !== undefined; // will be nicely inlined by gcc
		}

		// GCC hack see http:// stackoverflow.com/a/23202438/1517919
		function JSCompiler_renameProperty(a) {
			return a;
		}

		return MutationObserver;
	})(void 0);

	var m = Math,
		mround = function(r) {
			return r >> 0;
		},
		vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'Moz' : 'opera' in window ? 'O' : '',
		isAndroid = (/android/gi).test(navigator.appVersion),
		isIDevice = (/iphone|ipad/gi).test(navigator.appVersion),
		isPlaybook = (/playbook/gi).test(navigator.appVersion),
		isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
		has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix(),
		hasTouch = 'ontouchstart' in window && !isTouchPad,
		hasTransform = vendor + 'Transform' in document.documentElement.style,
		hasTransitionEnd = isIDevice || isPlaybook,
		nextFrame = (function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
				return setTimeout(callback, 1);
			}
		})(),
		cancelFrame = (function() {
			return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
		})(),
		RESIZE_EV = 'onorientationchange' in window ? 'orientationchange' : 'resize',
		START_EV = hasTouch ? 'touchstart' : 'mousedown',
		MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
		END_EV = hasTouch ? 'touchend' : 'mouseup',
		CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
		WHEEL_EV = vendor == 'Moz' ? 'DOMMouseScroll' : 'mousewheel',
		trnOpen = 'translate' + (has3d ? '3d(' : '('),
		trnClose = has3d ? ',0)' : ')',
		iScroll = function(el, options) {
			var that = this,
				doc = document,
				i;
			that.wrapper = typeof el == 'object' ? el : doc.getElementById(el);
			that.wrapper.style.overflow = 'hidden';
			that.scroller = that.wrapper.children[0];
			var MutationObserver = window.MutationObserver;
			var observer = new MutationObserver(function(mutations) {

				mutations.forEach(function(mutation) {
					if (that.options.onScrollMove && that.moved) that.options.onScrollMove.call(that);
				});
			});

			observer.observe(that.scroller, {
				attributes: true,
				attributeFilter: ['style']
			});

			that.options = {
				hScroll: true,
				vScroll: true,
				x: 0,
				y: 0,
				bounce: true,
				bounceLock: false,
				momentum: true,
				lockDirection: true,
				useTransform: true,
				useTransition: false,
				topOffset: 0,
				checkDOMChanges: false,
				hScrollbar: true,
				vScrollbar: true,
				fixedScrollbar: isAndroid,
				hideScrollbar: isIDevice,
				fadeScrollbar: isIDevice && has3d,
				scrollbarClass: '',
				zoom: false,
				zoomMin: 1,
				zoomMax: 4,
				doubleTapZoom: 2,
				wheelAction: 'scroll',
				snap: false,
				snapThreshold: 1,
				onRefresh: null,
				onBeforeScrollStart: function(e) {
					e.preventDefault();
				},
				onScrollStart: null,
				onBeforeScrollMove: null,
				onScrollMove: null,
				onBeforeScrollEnd: null,
				onScrollEnd: null,
				onTouchEnd: null,
				onDestroy: null,
				onZoomStart: null,
				onZoom: null,
				onZoomEnd: null
			};
			for (i in options) that.options[i] = options[i];
			that.x = that.options.x;
			that.y = that.options.y;
			that.options.useTransform = hasTransform ? that.options.useTransform : false;
			that.options.hScrollbar = that.options.hScroll && that.options.hScrollbar;
			that.options.vScrollbar = that.options.vScroll && that.options.vScrollbar;
			that.options.zoom = that.options.useTransform && that.options.zoom;
			that.options.useTransition = hasTransitionEnd && that.options.useTransition;
			if (that.options.zoom && isAndroid) {
				trnOpen = 'translate(';
				trnClose = ')';
			}
			that.scroller.style[vendor + 'TransitionProperty'] = that.options.useTransform ? '-' + vendor.toLowerCase() + '-transform' : 'top left';
			that.scroller.style[vendor + 'TransitionDuration'] = '0';
			that.scroller.style[vendor + 'TransformOrigin'] = '0 0';
			if (that.options.useTransition) that.scroller.style[vendor + 'TransitionTimingFunction'] = 'cubic-bezier(0.33,0.66,0.66,1)';
			if (that.options.useTransform) that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose;
			else that.scroller.style.cssText += ';position:absolute;top:' + that.y + 'px;left:' + that.x + 'px';
			if (that.options.useTransition) that.options.fixedScrollbar = true;
			that.refresh();
			that._bind(RESIZE_EV, window);
			that._bind(START_EV);
			if (!hasTouch) {
				that._bind('mouseout', that.wrapper);
				if (that.options.wheelAction != 'none')
					that._bind(WHEEL_EV);
			}
			if (that.options.checkDOMChanges) that.checkDOMTime = setInterval(function() {
				that._checkDOMChanges();
			}, 500);
		};
	iScroll.prototype = {
		enabled: true,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		currPageX: 0,
		currPageY: 0,
		pagesX: [],
		pagesY: [],
		aniTime: null,
		wheelZoomCount: 0,
		handleEvent: function(e) {
			var that = this;
			switch (e.type) {
				case START_EV:
					if (!hasTouch && e.button !== 0) return;
					that._start(e);
					break;
				case MOVE_EV:
					that._move(e);
					break;
				case END_EV:
				case CANCEL_EV:
					that._end(e);
					break;
				case RESIZE_EV:
					that._resize();
					break;
				case WHEEL_EV:
					that._wheel(e);
					break;
				case 'mouseout':
					that._mouseout(e);
					break;
				case 'webkitTransitionEnd':
					that._transitionEnd(e);
					break;
			}
		},
		_checkDOMChanges: function() {
			if (this.moved || this.zoomed || this.animating || (this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale)) return;
			this.refresh();
		},
		_scrollbar: function(dir) {
			var that = this,
				doc = document,
				bar;
			if (!that[dir + 'Scrollbar']) {
				if (that[dir + 'ScrollbarWrapper']) {
					if (hasTransform) that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = '';
					that[dir + 'ScrollbarWrapper'].parentNode.removeChild(that[dir + 'ScrollbarWrapper']);
					that[dir + 'ScrollbarWrapper'] = null;
					that[dir + 'ScrollbarIndicator'] = null;
				}
				return;
			}
			if (!that[dir + 'ScrollbarWrapper']) {
				bar = doc.createElement('div');
				if (that.options.scrollbarClass) bar.className = that.options.scrollbarClass + dir.toUpperCase();
				else bar.style.cssText = 'position:absolute;z-index:100;' + (dir == 'h' ? 'height:7px;bottom:1px;left:2px;right:' + (that.vScrollbar ? '7' : '2') + 'px' : 'width:7px;bottom:' + (that.hScrollbar ? '7' : '2') + 'px;top:2px;right:1px');
				bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:opacity;-' + vendor + '-transition-duration:' + (that.options.fadeScrollbar ? '350ms' : '0') + ';overflow:hidden;opacity:' + (that.options.hideScrollbar ? '0' : '1');
				that.wrapper.appendChild(bar);
				that[dir + 'ScrollbarWrapper'] = bar;
				bar = doc.createElement('div');
				if (!that.options.scrollbarClass) {
					bar.style.cssText = 'position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);-' + vendor + '-background-clip:padding-box;-' + vendor + '-box-sizing:border-box;' + (dir == 'h' ? 'height:100%' : 'width:100%') + ';-' + vendor + '-border-radius:3px;border-radius:3px';
				}
				bar.style.cssText += ';pointer-events:none;-' + vendor + '-transition-property:-' + vendor + '-transform;-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);-' + vendor + '-transition-duration:0;-' + vendor + '-transform:' + trnOpen + '0,0' + trnClose;
				if (that.options.useTransition) bar.style.cssText += ';-' + vendor + '-transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)';
				that[dir + 'ScrollbarWrapper'].appendChild(bar);
				that[dir + 'ScrollbarIndicator'] = bar;
			}
			if (dir == 'h') {
				that.hScrollbarSize = that.hScrollbarWrapper.clientWidth;
				that.hScrollbarIndicatorSize = m.max(mround(that.hScrollbarSize * that.hScrollbarSize / that.scrollerW), 8);
				that.hScrollbarIndicator.style.width = that.hScrollbarIndicatorSize + 'px';
				that.hScrollbarMaxScroll = that.hScrollbarSize - that.hScrollbarIndicatorSize;
				that.hScrollbarProp = that.hScrollbarMaxScroll / that.maxScrollX;
			} else {
				that.vScrollbarSize = that.vScrollbarWrapper.clientHeight;
				that.vScrollbarIndicatorSize = m.max(mround(that.vScrollbarSize * that.vScrollbarSize / that.scrollerH), 8);
				that.vScrollbarIndicator.style.height = that.vScrollbarIndicatorSize + 'px';
				that.vScrollbarMaxScroll = that.vScrollbarSize - that.vScrollbarIndicatorSize;
				that.vScrollbarProp = that.vScrollbarMaxScroll / that.maxScrollY;
			}
			that._scrollbarPos(dir, true);
		},
		_resize: function() {
			var that = this;
			setTimeout(function() {
				that.refresh();
			}, isAndroid ? 200 : 0);
		},
		_pos: function(x, y) {
			x = this.hScroll ? x : 0;
			y = this.vScroll ? y : 0;
			if (this.options.useTransform) {
				this.scroller.style[vendor + 'Transform'] = trnOpen + x + 'px,' + y + 'px' + trnClose + ' scale(' + this.scale + ')';
			} else {
				x = mround(x);
				y = mround(y);
				this.scroller.style.left = x + 'px';
				this.scroller.style.top = y + 'px';
			}
			this.x = x;
			this.y = y;
			this._scrollbarPos('h');
			this._scrollbarPos('v');
		},
		_scrollbarPos: function(dir, hidden) {
			var that = this,
				pos = dir == 'h' ? that.x : that.y,
				size;
			if (!that[dir + 'Scrollbar']) return;
			pos = that[dir + 'ScrollbarProp'] * pos;
			if (pos < 0) {
				if (!that.options.fixedScrollbar) {
					size = that[dir + 'ScrollbarIndicatorSize'] + mround(pos * 3);
					if (size < 8) size = 8;
					that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
				}
				pos = 0;
			} else if (pos > that[dir + 'ScrollbarMaxScroll']) {
				if (!that.options.fixedScrollbar) {
					size = that[dir + 'ScrollbarIndicatorSize'] - mround((pos - that[dir + 'ScrollbarMaxScroll']) * 3);
					if (size < 8) size = 8;
					that[dir + 'ScrollbarIndicator'].style[dir == 'h' ? 'width' : 'height'] = size + 'px';
					pos = that[dir + 'ScrollbarMaxScroll'] + (that[dir + 'ScrollbarIndicatorSize'] - size);
				} else {
					pos = that[dir + 'ScrollbarMaxScroll'];
				}
			}
			that[dir + 'ScrollbarWrapper'].style[vendor + 'TransitionDelay'] = '0';
			that[dir + 'ScrollbarWrapper'].style.opacity = hidden && that.options.hideScrollbar ? '0' : '1';
			that[dir + 'ScrollbarIndicator'].style[vendor + 'Transform'] = trnOpen + (dir == 'h' ? pos + 'px,0' : '0,' + pos + 'px') + trnClose;
		},
		_start: function(e) {
			var that = this,
				point = hasTouch ? e.touches[0] : e,
				matrix, x, y, c1, c2;
			if (!that.enabled) return;
			if (that.options.onBeforeScrollStart) that.options.onBeforeScrollStart.call(that, e);
			if (that.options.useTransition || that.options.zoom) that._transitionTime(0);
			that.moved = false;
			that.animating = false;
			1
			that.zoomed = false;
			that.distX = 0;
			that.distY = 0;
			that.absDistX = 0;
			that.absDistY = 0;
			that.dirX = 0;
			that.dirY = 0;
			if (that.options.zoom && hasTouch && e.touches.length > 1) {
				c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
				c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
				that.touchesDistStart = m.sqrt(c1 * c1 + c2 * c2);
				that.originX = m.abs(e.touches[0].pageX + e.touches[1].pageX - that.wrapperOffsetLeft * 2) / 2 - that.x;
				that.originY = m.abs(e.touches[0].pageY + e.touches[1].pageY - that.wrapperOffsetTop * 2) / 2 - that.y;
				if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
			}
			if (that.options.momentum) {
				if (that.options.useTransform) {
					matrix = getComputedStyle(that.scroller, null)[vendor + 'Transform'].replace(/[^0-9-.,]/g, '').split(',');
					x = matrix[4] * 1;
					y = matrix[5] * 1;
				} else {
					x = getComputedStyle(that.scroller, null).left.replace(/[^0-9-]/g, '') * 1;
					y = getComputedStyle(that.scroller, null).top.replace(/[^0-9-]/g, '') * 1;
				}
				if (x != that.x || y != that.y) {
					if (that.options.useTransition) that._unbind('webkitTransitionEnd');
					else cancelFrame(that.aniTime);
					that.steps = [];
					that._pos(x, y);
				}
			}
			that.absStartX = that.x;
			that.absStartY = that.y;
			that.startX = that.x;
			that.startY = that.y;
			that.pointX = point.pageX;
			that.pointY = point.pageY;
			that.startTime = e.timeStamp || Date.now();
			if (that.options.onScrollStart) that.options.onScrollStart.call(that, e);
			that._bind(MOVE_EV);
			that._bind(END_EV);
			that._bind(CANCEL_EV);
		},
		_move: function(e) {
			var that = this,
				point = hasTouch ? e.touches[0] : e,
				deltaX = point.pageX - that.pointX,
				deltaY = point.pageY - that.pointY,
				newX = that.x + deltaX,
				newY = that.y + deltaY,
				c1, c2, scale, timestamp = e.timeStamp || Date.now();
			if (that.options.onBeforeScrollMove) that.options.onBeforeScrollMove.call(that, e);
			if (that.options.zoom && hasTouch && e.touches.length > 1) {
				c1 = m.abs(e.touches[0].pageX - e.touches[1].pageX);
				c2 = m.abs(e.touches[0].pageY - e.touches[1].pageY);
				that.touchesDist = m.sqrt(c1 * c1 + c2 * c2);
				that.zoomed = true;
				scale = 1 / that.touchesDistStart * that.touchesDist * this.scale;
				if (scale < that.options.zoomMin) scale = 0.5 * that.options.zoomMin * Math.pow(2.0, scale / that.options.zoomMin);
				else if (scale > that.options.zoomMax) scale = 2.0 * that.options.zoomMax * Math.pow(0.5, that.options.zoomMax / scale);
				that.lastScale = scale / this.scale;
				newX = this.originX - this.originX * that.lastScale + this.x, newY = this.originY - this.originY * that.lastScale + this.y;
				this.scroller.style[vendor + 'Transform'] = trnOpen + newX + 'px,' + newY + 'px' + trnClose + ' scale(' + scale + ')';
				if (that.options.onZoom) that.options.onZoom.call(that, e);
				return;
			}
			that.pointX = point.pageX;
			that.pointY = point.pageY;
			if (newX > 0 || newX < that.maxScrollX) {
				newX = that.options.bounce ? that.x + (deltaX / 2) : newX >= 0 || that.maxScrollX >= 0 ? 0 : that.maxScrollX;
			}
			if (newY > that.minScrollY || newY < that.maxScrollY) {
				newY = that.options.bounce ? that.y + (deltaY / 2) : newY >= that.minScrollY || that.maxScrollY >= 0 ? that.minScrollY : that.maxScrollY;
			}
			if (that.absDistX < 6 && that.absDistY < 6) {
				that.distX += deltaX;
				that.distY += deltaY;
				that.absDistX = m.abs(that.distX);
				that.absDistY = m.abs(that.distY);
				return;
			}
			if (that.options.lockDirection) {
				if (that.absDistX > that.absDistY + 5) {
					newY = that.y;
					deltaY = 0;
				} else if (that.absDistY > that.absDistX + 5) {
					newX = that.x;
					deltaX = 0;
				}
			}
			that.moved = true;
			that._pos(newX, newY);
			that.dirX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
			that.dirY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
			if (timestamp - that.startTime > 300) {
				that.startTime = timestamp;
				that.startX = that.x;
				that.startY = that.y;
			}
			if (that.options.onScrollMove) that.options.onScrollMove.call(that, e);
		},
		_end: function(e) {
			if (hasTouch && e.touches.length != 0) return;
			var that = this,
				point = hasTouch ? e.changedTouches[0] : e,
				target, ev, momentumX = {
					dist: 0,
					time: 0
				},
				momentumY = {
					dist: 0,
					time: 0
				},
				duration = (e.timeStamp || Date.now()) - that.startTime,
				newPosX = that.x,
				newPosY = that.y,
				distX, distY, newDuration, snap, scale;
			that._unbind(MOVE_EV);
			that._unbind(END_EV);
			that._unbind(CANCEL_EV);
			if (that.options.onBeforeScrollEnd) that.options.onBeforeScrollEnd.call(that, e);
			if (that.zoomed) {
				scale = that.scale * that.lastScale;
				scale = Math.max(that.options.zoomMin, scale);
				scale = Math.min(that.options.zoomMax, scale);
				that.lastScale = scale / that.scale;
				that.scale = scale;
				that.x = that.originX - that.originX * that.lastScale + that.x;
				that.y = that.originY - that.originY * that.lastScale + that.y;
				that.scroller.style[vendor + 'TransitionDuration'] = '200ms';
				that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + that.scale + ')';
				that.zoomed = false;
				that.refresh();
				if (that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
				return;
			}
			if (!that.moved) {
				if (hasTouch) {
					if (that.doubleTapTimer && that.options.zoom) {
						clearTimeout(that.doubleTapTimer);
						that.doubleTapTimer = null;
						if (that.options.onZoomStart) that.options.onZoomStart.call(that, e);
						that.zoom(that.pointX, that.pointY, that.scale == 1 ? that.options.doubleTapZoom : 1);
						if (that.options.onZoomEnd) {
							setTimeout(function() {
								that.options.onZoomEnd.call(that, e);
							}, 200);
						}
					} else {
						that.doubleTapTimer = setTimeout(function() {
							that.doubleTapTimer = null;
							target = point.target;
							while (target.nodeType != 1) target = target.parentNode;
							if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA') {
								ev = document.createEvent('MouseEvents');
								ev.initMouseEvent('click', true, true, e.view, 1, point.screenX, point.screenY, point.clientX, point.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
								ev._fake = true;
								target.dispatchEvent(ev);
							}
						}, that.options.zoom ? 250 : 0);
					}
				}
				that._resetPos(200);
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
				return;
			}
			if (duration < 300 && that.options.momentum) {
				momentumX = newPosX ? that._momentum(newPosX - that.startX, duration, -that.x, that.scrollerW - that.wrapperW + that.x, that.options.bounce ? that.wrapperW : 0) : momentumX;
				momentumY = newPosY ? that._momentum(newPosY - that.startY, duration, -that.y, (that.maxScrollY < 0 ? that.scrollerH - that.wrapperH + that.y - that.minScrollY : 0), that.options.bounce ? that.wrapperH : 0) : momentumY;
				newPosX = that.x + momentumX.dist;
				newPosY = that.y + momentumY.dist;
				if ((that.x > 0 && newPosX > 0) || (that.x < that.maxScrollX && newPosX < that.maxScrollX)) momentumX = {
					dist: 0,
					time: 0
				};
				if ((that.y > that.minScrollY && newPosY > that.minScrollY) || (that.y < that.maxScrollY && newPosY < that.maxScrollY)) momentumY = {
					dist: 0,
					time: 0
				};
			}
			if (momentumX.dist || momentumY.dist) {
				newDuration = m.max(m.max(momentumX.time, momentumY.time), 10);
				if (that.options.snap) {
					distX = newPosX - that.absStartX;
					distY = newPosY - that.absStartY;
					if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) {
						that.scrollTo(that.absStartX, that.absStartY, 200);
					} else {
						snap = that._snap(newPosX, newPosY);
						newPosX = snap.x;
						newPosY = snap.y;
						newDuration = m.max(snap.time, newDuration);
					}
				}
				that.scrollTo(mround(newPosX), mround(newPosY), newDuration);
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
				return;
			}
			if (that.options.snap) {
				distX = newPosX - that.absStartX;
				distY = newPosY - that.absStartY;
				if (m.abs(distX) < that.options.snapThreshold && m.abs(distY) < that.options.snapThreshold) that.scrollTo(that.absStartX, that.absStartY, 200);
				else {
					snap = that._snap(that.x, that.y);
					if (snap.x != that.x || snap.y != that.y) that.scrollTo(snap.x, snap.y, snap.time);
				}
				if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
				return;
			}
			that._resetPos(200);
			if (that.options.onTouchEnd) that.options.onTouchEnd.call(that, e);
		},
		_resetPos: function(time) {
			var that = this,
				resetX = that.x >= 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x,
				resetY = that.y >= that.minScrollY || that.maxScrollY > 0 ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
			if (resetX == that.x && resetY == that.y) {
				if (that.moved) {
					that.moved = false;
					if (that.options.onScrollEnd) that.options.onScrollEnd.call(that);
				}
				if (that.hScrollbar && that.options.hideScrollbar) {
					if (vendor == 'webkit') that.hScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
					that.hScrollbarWrapper.style.opacity = '0';
				}
				if (that.vScrollbar && that.options.hideScrollbar) {
					if (vendor == 'webkit') that.vScrollbarWrapper.style[vendor + 'TransitionDelay'] = '300ms';
					that.vScrollbarWrapper.style.opacity = '0';
				}
				return;
			}
			that.scrollTo(resetX, resetY, time || 0);
		},
		_wheel: function(e) {
			var that = this,
				wheelDeltaX, wheelDeltaY, deltaX, deltaY, deltaScale;
			if ('wheelDeltaX' in e) {
				wheelDeltaX = e.wheelDeltaX / 12;
				wheelDeltaY = e.wheelDeltaY / 12;
			} else if ('detail' in e) {
				wheelDeltaX = wheelDeltaY = -e.detail * 3;
			} else {
				wheelDeltaX = wheelDeltaY = -e.wheelDelta;
			}
			if (that.options.wheelAction == 'zoom') {
				deltaScale = that.scale * Math.pow(2, 1 / 3 * (wheelDeltaY ? wheelDeltaY / Math.abs(wheelDeltaY) : 0));
				if (deltaScale < that.options.zoomMin) deltaScale = that.options.zoomMin;
				if (deltaScale > that.options.zoomMax) deltaScale = that.options.zoomMax;
				if (deltaScale != that.scale) {
					if (!that.wheelZoomCount && that.options.onZoomStart) that.options.onZoomStart.call(that, e);
					that.wheelZoomCount++;
					that.zoom(e.pageX, e.pageY, deltaScale, 400);
					setTimeout(function() {
						that.wheelZoomCount--;
						if (!that.wheelZoomCount && that.options.onZoomEnd) that.options.onZoomEnd.call(that, e);
					}, 400);
				}
				return;
			}
			deltaX = that.x + wheelDeltaX;
			deltaY = that.y + wheelDeltaY;
			if (deltaX > 0) deltaX = 0;
			else if (deltaX < that.maxScrollX) deltaX = that.maxScrollX;
			if (deltaY > that.minScrollY) deltaY = that.minScrollY;
			else if (deltaY < that.maxScrollY) deltaY = that.maxScrollY;
			that.scrollTo(deltaX, deltaY, 0);
		},
		_mouseout: function(e) {
			var t = e.relatedTarget;
			if (!t) {
				this._end(e);
				return;
			}
			while (t = t.parentNode)
				if (t == this.wrapper) return;
			this._end(e);
		},
		_transitionEnd: function(e) {
			var that = this;
			if (e.target != that.scroller) return;
			that._unbind('webkitTransitionEnd');
			that._startAni();
		},
		_startAni: function() {
			var that = this,
				startX = that.x,
				startY = that.y,
				startTime = Date.now(),
				step, easeOut, animate;
			if (that.animating) return;
			if (!that.steps.length) {
				that._resetPos(400);
				return;
			}
			step = that.steps.shift();
			if (step.x == startX && step.y == startY) step.time = 0;
			that.animating = true;
			that.moved = true;
			if (that.options.useTransition) {
				that._transitionTime(step.time);
				that._pos(step.x, step.y);
				that.animating = false;
				if (step.time) that._bind('webkitTransitionEnd');
				else that._resetPos(0);
				return;
			}
			animate = function() {
				var now = Date.now(),
					newX, newY;
				if (now >= startTime + step.time) {
					that._pos(step.x, step.y);
					that.animating = false;
					if (that.options.onAnimationEnd) that.options.onAnimationEnd.call(that);
					that._startAni();
					return;
				}
				now = (now - startTime) / step.time - 1;
				easeOut = m.sqrt(1 - now * now);
				newX = (step.x - startX) * easeOut + startX;
				newY = (step.y - startY) * easeOut + startY;
				that._pos(newX, newY);
				if (that.animating) that.aniTime = nextFrame(animate);
			};
			animate();
		},
		_transitionTime: function(time) {
			time += 'ms';
			this.scroller.style[vendor + 'TransitionDuration'] = time;
			if (this.hScrollbar) this.hScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
			if (this.vScrollbar) this.vScrollbarIndicator.style[vendor + 'TransitionDuration'] = time;
		},
		_momentum: function(dist, time, maxDistUpper, maxDistLower, size) {
			var deceleration = 0.0006,
				speed = m.abs(dist) / time,
				newDist = (speed * speed) / (2 * deceleration),
				newTime = 0,
				outsideDist = 0;
			if (dist > 0 && newDist > maxDistUpper) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistUpper = maxDistUpper + outsideDist;
				speed = speed * maxDistUpper / newDist;
				newDist = maxDistUpper;
			} else if (dist < 0 && newDist > maxDistLower) {
				outsideDist = size / (6 / (newDist / speed * deceleration));
				maxDistLower = maxDistLower + outsideDist;
				speed = speed * maxDistLower / newDist;
				newDist = maxDistLower;
			}
			newDist = newDist * (dist < 0 ? -1 : 1);
			newTime = speed / deceleration;
			return {
				dist: newDist,
				time: mround(newTime)
			};
		},
		_offset: function(el) {
			var left = -el.offsetLeft,
				top = -el.offsetTop;
			while (el = el.offsetParent) {
				left -= el.offsetLeft;
				top -= el.offsetTop;
			}
			if (el != this.wrapper) {
				left *= this.scale;
				top *= this.scale;
			}
			return {
				left: left,
				top: top
			};
		},
		_snap: function(x, y) {
			var that = this,
				i, l, page, time, sizeX, sizeY;
			page = that.pagesX.length - 1;
			for (i = 0, l = that.pagesX.length; i < l; i++) {
				if (x >= that.pagesX[i]) {
					page = i;
					break;
				}
			}
			if (page == that.currPageX && page > 0 && that.dirX < 0) page--;
			x = that.pagesX[page];
			sizeX = m.abs(x - that.pagesX[that.currPageX]);
			sizeX = sizeX ? m.abs(that.x - x) / sizeX * 500 : 0;
			that.currPageX = page;
			page = that.pagesY.length - 1;
			for (i = 0; i < page; i++) {
				if (y >= that.pagesY[i]) {
					page = i;
					break;
				}
			}
			if (page == that.currPageY && page > 0 && that.dirY < 0) page--;
			y = that.pagesY[page];
			sizeY = m.abs(y - that.pagesY[that.currPageY]);
			sizeY = sizeY ? m.abs(that.y - y) / sizeY * 500 : 0;
			that.currPageY = page;
			time = mround(m.max(sizeX, sizeY)) || 200;
			return {
				x: x,
				y: y,
				time: time
			};
		},
		_bind: function(type, el, bubble) {
			(el || this.scroller).addEventListener(type, this, !!bubble);
		},
		_unbind: function(type, el, bubble) {
			(el || this.scroller).removeEventListener(type, this, !!bubble);
		},
		destroy: function() {
			var that = this;
			that.scroller.style[vendor + 'Transform'] = '';
			that.hScrollbar = false;
			that.vScrollbar = false;
			that._scrollbar('h');
			that._scrollbar('v');
			that._unbind(RESIZE_EV, window);
			that._unbind(START_EV);
			that._unbind(MOVE_EV);
			that._unbind(END_EV);
			that._unbind(CANCEL_EV);
			if (!that.options.hasTouch) {
				that._unbind('mouseout', that.wrapper);
				that._unbind(WHEEL_EV);
			}
			if (that.options.useTransition) that._unbind('webkitTransitionEnd');
			if (that.options.checkDOMChanges) clearInterval(that.checkDOMTime);
			if (that.options.onDestroy) that.options.onDestroy.call(that);
		},
		refresh: function() {
			var that = this,
				offset, i, l, els, pos = 0,
				page = 0;
			if (that.scale < that.options.zoomMin) that.scale = that.options.zoomMin;
			that.wrapperW = that.wrapper.clientWidth || 1;
			that.wrapperH = that.wrapper.clientHeight || 1;
			that.minScrollY = -that.options.topOffset || 0;
			that.scrollerW = mround(that.scroller.offsetWidth * that.scale);
			that.scrollerH = mround((that.scroller.offsetHeight + that.minScrollY) * that.scale);
			that.maxScrollX = that.wrapperW - that.scrollerW;
			that.maxScrollY = that.wrapperH - that.scrollerH + that.minScrollY;
			that.dirX = 0;
			that.dirY = 0;
			if (that.options.onRefresh) that.options.onRefresh.call(that);
			that.hScroll = that.options.hScroll && that.maxScrollX < 0;
			that.vScroll = that.options.vScroll && (!that.options.bounceLock && !that.hScroll || that.scrollerH > that.wrapperH);
			that.hScrollbar = that.hScroll && that.options.hScrollbar;
			that.vScrollbar = that.vScroll && that.options.vScrollbar && that.scrollerH > that.wrapperH;
			offset = that._offset(that.wrapper);
			that.wrapperOffsetLeft = -offset.left;
			that.wrapperOffsetTop = -offset.top;
			if (typeof that.options.snap == 'string') {
				that.pagesX = [];
				that.pagesY = [];
				els = that.scroller.querySelectorAll(that.options.snap);
				for (i = 0, l = els.length; i < l; i++) {
					pos = that._offset(els[i]);
					pos.left += that.wrapperOffsetLeft;
					pos.top += that.wrapperOffsetTop;
					that.pagesX[i] = pos.left < that.maxScrollX ? that.maxScrollX : pos.left * that.scale;
					that.pagesY[i] = pos.top < that.maxScrollY ? that.maxScrollY : pos.top * that.scale;
				}
			} else if (that.options.snap) {
				that.pagesX = [];
				while (pos >= that.maxScrollX) {
					that.pagesX[page] = pos;
					pos = pos - that.wrapperW;
					page++;
				}
				if (that.maxScrollX % that.wrapperW) that.pagesX[that.pagesX.length] = that.maxScrollX - that.pagesX[that.pagesX.length - 1] + that.pagesX[that.pagesX.length - 1];
				pos = 0;
				page = 0;
				that.pagesY = [];
				while (pos >= that.maxScrollY) {
					that.pagesY[page] = pos;
					pos = pos - that.wrapperH;
					page++;
				}
				if (that.maxScrollY % that.wrapperH) that.pagesY[that.pagesY.length] = that.maxScrollY - that.pagesY[that.pagesY.length - 1] + that.pagesY[that.pagesY.length - 1];
			}
			that._scrollbar('h');
			that._scrollbar('v');
			if (!that.zoomed) {
				that.scroller.style[vendor + 'TransitionDuration'] = '0';
				that._resetPos(200);
			}
		},
		scrollTo: function(x, y, time, relative) {
			var that = this,
				step = x,
				i, l;
			that.stop();
			if (!step.length) step = [{
				x: x,
				y: y,
				time: time,
				relative: relative
			}];
			for (i = 0, l = step.length; i < l; i++) {
				if (step[i].relative) {
					step[i].x = that.x - step[i].x;
					step[i].y = that.y - step[i].y;
				}
				that.steps.push({
					x: step[i].x,
					y: step[i].y,
					time: step[i].time || 0
				});
			}
			that._startAni();
		},
		scrollToElement: function(el, time) {
			var that = this,
				pos;
			el = el.nodeType ? el : that.scroller.querySelector(el);
			if (!el) return;
			pos = that._offset(el);
			pos.left += that.wrapperOffsetLeft;
			pos.top += that.wrapperOffsetTop;
			pos.left = pos.left > 0 ? 0 : pos.left < that.maxScrollX ? that.maxScrollX : pos.left;
			pos.top = pos.top > that.minScrollY ? that.minScrollY : pos.top < that.maxScrollY ? that.maxScrollY : pos.top;
			time = time === undefined ? m.max(m.abs(pos.left) * 2, m.abs(pos.top) * 2) : time;
			that.scrollTo(pos.left, pos.top, time);
		},
		scrollToPage: function(pageX, pageY, time) {
			var that = this,
				x, y;
			time = time === undefined ? 400 : time;
			if (that.options.onScrollStart) that.options.onScrollStart.call(that);
			if (that.options.snap) {
				pageX = pageX == 'next' ? that.currPageX + 1 : pageX == 'prev' ? that.currPageX - 1 : pageX;
				pageY = pageY == 'next' ? that.currPageY + 1 : pageY == 'prev' ? that.currPageY - 1 : pageY;
				pageX = pageX < 0 ? 0 : pageX > that.pagesX.length - 1 ? that.pagesX.length - 1 : pageX;
				pageY = pageY < 0 ? 0 : pageY > that.pagesY.length - 1 ? that.pagesY.length - 1 : pageY;
				that.currPageX = pageX;
				that.currPageY = pageY;
				x = that.pagesX[pageX];
				y = that.pagesY[pageY];
			} else {
				x = -that.wrapperW * pageX;
				y = -that.wrapperH * pageY;
				if (x < that.maxScrollX) x = that.maxScrollX;
				if (y < that.maxScrollY) y = that.maxScrollY;
			}
			that.scrollTo(x, y, time);
		},
		disable: function() {
			this.stop();
			this._resetPos(0);
			this.enabled = false;
			this._unbind(MOVE_EV);
			this._unbind(END_EV);
			this._unbind(CANCEL_EV);
		},
		enable: function() {
			this.enabled = true;
		},
		stop: function() {
			if (this.options.useTransition) this._unbind('webkitTransitionEnd');
			else cancelFrame(this.aniTime);
			this.steps = [];
			this.moved = false;
			this.animating = false;
		},
		zoom: function(x, y, scale, time) {
			var that = this,
				relScale = scale / that.scale;
			if (!that.options.useTransform) return;
			that.zoomed = true;
			time = time === undefined ? 200 : time;
			x = x - that.wrapperOffsetLeft - that.x;
			y = y - that.wrapperOffsetTop - that.y;
			that.x = x - x * relScale + that.x;
			that.y = y - y * relScale + that.y;
			that.scale = scale;
			that.refresh();
			that.x = that.x > 0 ? 0 : that.x < that.maxScrollX ? that.maxScrollX : that.x;
			that.y = that.y > that.minScrollY ? that.minScrollY : that.y < that.maxScrollY ? that.maxScrollY : that.y;
			that.scroller.style[vendor + 'TransitionDuration'] = time + 'ms';
			that.scroller.style[vendor + 'Transform'] = trnOpen + that.x + 'px,' + that.y + 'px' + trnClose + ' scale(' + scale + ')';
			that.zoomed = false;
		},
		isReady: function() {
			return !this.moved && !this.zoomed && !this.animating;
		}
	};
	if (typeof exports !== 'undefined') exports.iScroll = iScroll;
	else window.iScroll = iScroll;
})();