

function setup() {
	createCanvas(1920, 1080);
	background(51);
	noStroke();
	/*try {
		img = loadImage("currCanvas.jpg");
		image(img, 0, 0);
	} catch(exception){
		console.log("Error: "+ exception);
	}*/
	ucol = color(int(random(255)), int(random(255)), int(random(255)));
	socket = io.connect('52.90.112.43:3000');
	socket.on('mouse', newDrawing);

	/*$.ajax({
		url: "getPixels",
		type: "get"
	}).done(rePaint);*/

	mode = 'free';
	linState = null;
	freeStrokeTog = false;
	smooth();
	noStroke();
	changed = false;
	modes = {
		'circle': newCirc,
		'text': newText,
		'line': newLine,
		'free': newFree

	}

}

/*function rePaint(data){

	if(data.pixels!=null){

		console.log("repainting");
		loadPixels();
		var d = pixelDensity();
		var imagePixlen = 4 * (width * d) * (height * d);
		for (var i = 0; i < imagePixlen; i+=4) {
		  pixels[i] = data.pixels[i];
		  pixels[i+1] = data.pixels[i+1];
		  pixels[i+2] = data.pixels[i+2];
		  pixels[i+3] = data.pixels[i+3];
		}
		updatePixels();
		console.log("done repainting");

	}
	
}*/

function newDrawing(data){
	modes[data.mode](data);
}
function draw(){
	/*if(changed == true){
		loadPixels();
		data = { 'pixels': pixels	};
		console.log(pixels.length);
		$.ajax({
			url: "/setPixels",
			type: "post",
			data: data
		}).done(function(data) {

		updatePixels();
		//saveCanvas("currCanvas", "jpg");
		changed = false;
		});

	}
	*/
}


function mouseDragged(){
	changed = true;
	//console.log("dragged");
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

}

function mouseClicked(){
	
	console.log("clicked");
	if(mode == 'circle'){
		changed = true;
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
		changed = true;
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
			changed = true;
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
	changed = true;
	console.log("released");
	if(mode == 'free'){
		x1 = null;
		y1 = null;
		x2 = null;
		y2 = null;
		linState = null;
	}
}

