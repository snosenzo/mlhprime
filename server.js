var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();



module.exports = router;

var app = express();
var server = app.listen(3000); //port 3000


app.use(express.static('public'));
/*var getPixels  = require('./routes/getPixels');//Form page to test
var setPixels  = require('./routes/setPixels');//Form page to test
app.use('/getPixels', getPixels); //post test
app.use('/setPixels', setPixels); //post test
*/
console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);


pixels = [];


function newConnection(socket){
	console.log('new connection' + socket.id);
	
	

	socket.on('mouse', mouseMsg);
	

	function mouseMsg(data) {
		socket.broadcast.emit('mouse', data);
		//io.sockets.emit('mouse', data); //this includes the sender
		console.log(data);
	}
	

}



