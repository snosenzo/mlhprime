var express = require('express');

var app = express();
var server = app.listen(3000); //port 3000

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);
var pxls = [];
io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection' + socket.id);

	socket.on('mouse', mouseMsg);

	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data);
		//io.sockets.emit('mouse', data); //this includes the sender
		console.log(data);
	}

}

