

function setup() {
	createCanvas(1920, 1080);
	background(51);
	posx = 0;
	posy = 0;
	noStroke();
	ucol = color(int(random(255)), int(random(255)), int(random(255)));
	socket = io.connect('10.20.2.67:3000');
	socket.on('mouse', newDrawing);
	mode = 'circle';
	linState = null;
	freeStrokeTog = false;
	smooth();

	modes = {
		'circle': newCirc,
		'text': newText,
		'line': newLine,
		'free': newFree

	}

}

function newDrawing(data){
	modes[data.mode](data);
}
function draw(){
	translate(posx, posy);

}
function mousePressed(){
	if(mode == 'move'){
		var x1 = mouseX;
		var y1 = mouseY;

	}
}

function mouseDragged(){
	//console.log('Sending:' + mouseX+","+mouseY);
	if(mode == 'circle'){
		var data = {
			mode: 'circle',
			x: int(mouseX),
			y: int(mouseY),
			colr: red(ucol),
			colg: green(ucol),
			colb: blue(ucol)
		}

		socket.emit('mouse', data);
		fill(ucol);
	  	ellipse(mouseX, mouseY, 20 ,20);
	}
	if(mode == 'free'){
		if(!linState){
			x1 = mouseX;
			y1 = mouseY;
			linState = 1;
		} else {
			sw = 2;
			x2 = mouseX;
			y2 = mouseY;
			if(freeStrokeTog){
				d = dist(x1, y1, x2, y2);
				d = constrain(d, 1, 25);
				sw = map(d, 1, 25, 10, 1);
			}
			strokeWeight(sw);
			stroke(ucol)
			line(x1, y1, x2, y2);
			var data = {
				mode: 'free',
				x1: int(x1),
				y1: int(y1),
				x2: int(x2),
				y2: int(y2),
				strokeW: sw,
				colr: red(ucol),
				colg: green(ucol),
				colb: blue(ucol),
				
			}
			socket.emit('mouse', data);
			x1 = x2;
			y1 = y2;
	
		}
	}
	if(mode == 'move'){

	}
}

function mouseClicked(){
	if(mode == 'circle'){
		var data = {
			mode: 'circle',
			x: int(mouseX),
			y: int(mouseY),
			colr: red(ucol),
			colg: green(ucol),
			colb: blue(ucol)
		}

		socket.emit('mouse', data);
		fill(ucol);
	  	ellipse(mouseX, mouseY, 20 ,20);
	}
	if(mode == 'text'){
		textSize(32);
		fill(ucol);
		txt = 'Node.js is the only real dev language';
		text(txt, mouseX, mouseY);
		var data = {
			mode: 'text',
			x: int(mouseX),
			y: int(mouseY),
			colr: red(ucol),
			colg: green(ucol),
			colb: blue(ucol),
			txtd: txt
		}
		socket.emit('mouse', data);
	}
	if(mode == 'line'){
		

		if(!linState){
			x1 = mouseX;
			y1 = mouseY;
			linState = 1;
		} else {
			x2 = mouseX;
			y2 = mouseY;
			stroke(ucol)
			line(x1, y1, x2, y2);
			var data = {
				mode: 'line',
				x1: int(x1),
				y1: int(y1),
				x2: int(x2),
				y2: int(y2),
				colr: red(ucol),
				colg: green(ucol),
				colb: blue(ucol),
				
			}
			socket.emit('mouse', data);
			x1 = null;
			y1 = null;
			x2 = null;
			y2 = null;
			linState = null;
		}
	}
}

function mouseReleased(){
	if(mode == 'free'){
		x1 = null;
		y1 = null;
		x2 = null;
		y2 = null;
		linState = null;
	}
}

