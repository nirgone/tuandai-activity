(function() {
	FastClick.attach(document.body);
 	

	function getStatus() {
		var sys = navigator.userAgent.match(/(iPad|iPhone)/) ? 'IOS' : 'Android';
		var version = getVersion();
		var param = {
			SystemName: sys,
			Version: version,
			MethodName: ' home_teststop'
		};
		$.ajax({
			url: 'http://10.100.1.113:9223/api/project/doold',
			type: 'post',
			dataType: 'json',
			data: param,
			success: function(result) {
				console.info('result---', result);
				if (result && result.ReturnCode == 1) {
					(result.Data && result.Data.isStop) || Jsbridge.closeWeb();
				}
			}
		});
	}

	function getVersion() {
		var str = navigator.userAgent;
		var arr = str.match(/\[([^\[\]]*)\]/);
		if (arr && arr[1]) {
			var vst = arr[1].split('_');
			var vstr = vst[0] + vst[1];
			if (vst && (vstr == "tuandaiappandroid" || vstr == "tuandaiappIOS")) {
				return vst[vst.length - 1];
			} else {
				return '';
			}
		} else {
			return '';
		}
	}
	Jsbridge.appLifeHook(null, null, getStatus, null, null, getStatus);

})();