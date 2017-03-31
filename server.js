var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

//Lets define a port we want to listen to
const PORT = 8080;

//We need a function which handles requests and send response
function handleRequest(request, response) {
	var filePath = request.url;
	if (filePath == '/')
		filePath = '/index.html';

	filePath = __dirname + filePath;
	var extname = path.extname(filePath);
	var contentType = 'text/html';

	switch (extname) {
	case '.js':
		contentType = 'text/javascript';
		break;
	case '.css':
		contentType = 'text/css';
		break;
	case '.xml':
		contentType = 'text/xml';
		break;
	}

	fs.exists(filePath, function (exists) {

		if (exists) {
			fs.readFile(filePath, function (error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, {
						'Content-Type': contentType
					});
					response.end(content, 'utf-8');
				}
			});
		}
	});
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
	//Callback triggered when server is successfully listening. Hurray!
	console.log("Server listening on: http://localhost:%s", PORT);
});