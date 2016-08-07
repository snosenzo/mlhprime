


function newCirc(data){
	fill(data.colr, data.colg, data.colb);
	ellipse(data.x, data.y ,20, 20);
}


function newText(data){
	textSize(32);
	fill(data.colr, data.colg, data.colb);
	text(data.txtd, data.x, data.y);
}

function newLine(data){
	stroke(data.colr, data.colg, data.colb);
	line(data.x1, data.y1, data.x2, data.y2);
}

function newFree(data){
	strokeWeight(data.strokeW);
	stroke(data.colr, data.colg, data.colb);
	line(data.x1, data.y1, data.x2, data.y2);
}