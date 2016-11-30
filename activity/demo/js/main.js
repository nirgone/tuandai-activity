var worker = new Worker('task.js');
worker.postMessage({
	id: 1,
	msg: 'Hello World'
});

worker.onmessage = function(message) {
	var data = message.data;
	console.log(JSON.stringify(data));
	worker.terminate();
};
worker.onerror = function(error) {
	console.log(error);
	console.log(error.filename, error.lineno, error.message);
}