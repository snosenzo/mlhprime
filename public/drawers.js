

$("#circles").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    mode = 'circle';
    console.log(mode);
});

$("#free").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    mode = 'free';
    console.log(mode);
});

$("#text").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    mode = 'text';
    console.log(mode);
});
$("#line").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    mode = 'line';
    console.log(mode);
});

$("#square").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    mode = 'square';
    console.log(mode);
});

$("#freetoggle").click(function(e){
    e.preventDefault();//this will prevent the link trying to navigate to another page
    freeStrokeTog=!freeStrokeTog;
});


function newCirc(data){
	noStroke();
	fill(data.colr, data.colg, data.colb);
	ellipse(data.x, data.y ,20, 20);
	stroke(ucol);
}
function newSquare(data){
	fill(data.colr, data.colg, data.colb);
	rect(data.x, data.y ,20, 20);
}


function newText(data){
	textSize(32);
	noStroke();
	fill(data.colr, data.colg, data.colb);
	text(data.txtd, data.x, data.y);
	stroke(ucol);
}

function newLine(data){
	stroke(data.colr, data.colg, data.colb);
	line(data.x1, data.y1, data.x2, data.y2);
	stroke(ucol);
}

function newFree(data){
	strokeWeight(data.strokeW);
	stroke(data.colr, data.colg, data.colb);
	line(data.x1, data.y1, data.x2, data.y2);
	stroke(ucol);
}