var onmessage = function(message) {
	var data = message.data;
	data.msg = 'Hi from task.js';
	postMessage(data);
}