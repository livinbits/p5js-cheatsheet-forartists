var canvasSize = 220;
var p5Pink = "#ed225d";
var p5PinkLight = "#f04273";
let txtSz = 18
let fontFile = 'fonts/FiraCode-Bold.otf'

function drawArrow() {  // sketch, xStart, yStart, direction1, length1, direction2, length2, ...
	var p = arguments[0];
	var x = arguments[1];
	var y = arguments[2];
	var ai = 3;  // argument index of current direction/length segment
	var dir;
	var mag;
	p.push();
	p.angleMode(p.DEGREES);
	p.stroke(0);
	p.noFill();
	p.beginShape();
		p.vertex(x,y);
		for (var seg=ai; seg<arguments.length; seg+=2) {
			dir = arguments[ai++];
			mag = arguments[ai++];
			x += p.cos(dir)*mag;
			y += p.sin(dir)*mag;
			p.vertex(x,y);
		}
	p.endShape();
	var x2 = x + p.cos(dir+140) * 10;
	var y2 = y + p.sin(dir+140) * 10;
	var x3 = x + p.cos(dir-140) * 10;
	var y3 = y + p.sin(dir-140) * 10;
	p.noStroke();
	p.fill(0);
	p.triangle(x, y, x2, y2, x3, y3);
	p.pop();
}

var colormodeSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize*2.8, canvasSize*1.2);
		canvas.parent("colormode-canvas");
		p.colorMode(p.HSB, 360, 100, 100);
		p.strokeWeight(0.25);
		p.angleMode(p.DEGREES);

		var xH = p.width * 0.233;
		var y0 = p.height * 0.5;
		var barsW = p.width*0.04;
		var barsH = p.height*0.65;
		var barsT = y0 - barsH * 0.45;
		var barsB = barsT + barsH;
		var barLL = p.width * 0.7;  // lightness left
		var barBL = p.width * 0.9;  // brightness left

		var radius = p.height * 0.35;
		var radius2 = p.height * 0.4;
		var radius3 = p.height * 0.48;

		// color wheel
		p.noStroke();
		p.beginShape(p.TRIANGLE_FAN);
		p.vertex(xH, y0, 0);
		for (var h=0; h<365; h+=5) {
			p.fill(h, 100, 100);
			p.stroke(h, 100, 100);
			var x = xH + p.cos(h) * radius;
			var y = y0 + p.sin(h) * radius;
			p.vertex(x, y, 0);
		}
		p.endShape();
		p.erase();
		p.circle(xH, y0, radius*1.55);
		p.noErase();

		// hue degrees
		p.textSize(txtSz*1.1);
		p.textFont(fira);
		p.textAlign(p.CENTER, p.CENTER);
		p.fill(0);
		p.strokeWeight(1);
		for (var i=0; i<360; i+=60){
			var x1 = xH + p.cos(i) * radius;
			var y1 = y0 + p.sin(i) * radius;
			var x2 = xH + p.cos(i) * radius2;
			var y2 = y0 + p.sin(i) * radius2;
			var x3 = xH + p.cos(i) * radius3;
			var y3 = y0 + p.sin(i) * radius3 * 0.975;
			p.stroke(0);
			p.line(x1, y1, x2, y2);

			p.noStroke();
			p.text(i, x3, y3-4);
		}
		p.text("maxH = 360", xH, y0-3);

		// lightness/brightness bars
		p.noStroke();
		p.colorMode(p.HSL,360,100,barsH);
		for (var by=0; by<barsH; by+=2) {
			p.fill(0,100,by);
			p.rect(barLL, barsB-by-2, barsW, 2.5);
		}
		p.colorMode(p.HSB,360,100,barsH);
		for (var by=0; by<barsH; by+=2) {
			p.fill(0,100,by);
			p.rect(barBL, barsB-by-2, barsW, 2.5);
		}
		p.fill(0);
		var tx1 = barLL+barsW/2;
		var tx3 = barBL+barsW/2;
		var tx2 = (tx1+tx3) / 2;
		p.text("L", tx1, barsT-22);
		p.text("B", tx3, barsT-22);
		p.text("100", tx2, barsT-2);
		p.text("0", tx2, barsB-2);
		p.strokeWeight(0.25);
		p.stroke(0);
		p.line(barLL+barsW, barsT, barLL+barsW*1.5, barsT);
		p.line(barLL+barsW, barsB, barLL+barsW*1.5, barsB);
		p.line(barBL-barsW*0.5, barsT, barBL, barsT);
		p.line(barBL-barsW*0.5, barsB, barBL, barsB);
	};
};

var gridSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize*1.1, canvasSize);
		canvas.parent("grid-canvas");
		p.strokeWeight(0.25);
		p.translate(canvasSize/15, canvasSize/15);


		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}

		var x1 = gridSize / 10 * 6;
		var y1 = gridSize / 10 * 7;

		p.strokeWeight(2);
		p.line(0, y1, x1, y1);
		p.line(x1, 0, x1, y1);

		p.noStroke();
		p.fill("#000000");
		p.circle(0, 0, gridSize/20);
		p.circle(x1, y1, gridSize/20);

		p.stroke(255);
		p.strokeWeight(2);
		p.textSize(txtSz);
		p.textAlign(p.LEFT, p.TOP);
		p.textFont(fira);
		p.text("(0,0)", 5, 5);
		p.textAlign(p.CENTER, p.CENTER);
		p.text("(x,y)", x1, y1+15);
		p.text("x", x1/2, y1-15);
		p.text("y", x1+12, y1/2);
	};
};

var anglesSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize*2.5, canvasSize*1.7);
		canvas.parent("angles-canvas");

		var gridSize = p.height*0.95;
		var x0 = p.width * 0.5;
		var y0 = p.height * 0.44;
		var radius1 = gridSize * 0.26;
		var radius2 = gridSize * 0.34;
		var radius3 = gridSize * 0.45;

		p.noFill();
		p.strokeWeight(2);
		p.circle(x0, y0, gridSize * 0.6);

		p.textSize(txtSz*1.65);
		p.textFont(fira);
		p.textAlign(p.CENTER, p.CENTER);
		p.strokeWeight(1);
		for (var i=0; i<8; i++){
			var a = i * p.QUARTER_PI;
			var cosa = p.cos(a);
			var sina = p.sin(a);
			var x1 = x0 + cosa * radius1;
			var y1 = y0 + sina * radius1;
			var x2 = x0 + cosa * radius2;
			var y2 = y0 + sina * radius2;
			var x3 = x0 + cosa * radius3;
			var y3 = y0 +sina * radius3 * 0.9;
			p.stroke(0);
			p.line(x1, y1, x2, y2);

			p.fill(0);
			p.noStroke();
			p.text(a.toFixed(2), x3, y3-4);
			p.fill(p5Pink);
			switch (i) {
				case 0: p.text("TWO_PI", x3+2, y3-40); break;
				case 1: p.text("QUARTER_PI", x3+28, y3+30); break;
				case 2: p.text("HALF_PI", x3, y3+30); break;
				case 4: p.text("PI", x3, y3+30); break;
			}
		}
	};
};

var lineSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize, canvasSize);
		canvas.parent("line-canvas");
		p.strokeWeight(0.25);
		p.translate(canvasSize/15, canvasSize/15);

		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}

		p.noStroke();
		p.fill("#000000");
		var x1 = gridSize / 10 * 4;
		var y1 = gridSize / 10 * 3;
		var x2 = gridSize / 10 * 7;
		var y2 = gridSize / 10 * 7;
		p.ellipse(x1, y1, gridSize/20, gridSize/20);
		p.ellipse(x2, y2, gridSize/20, gridSize/20);
		p.stroke("#000000");
		p.strokeWeight(2);
		p.line(x1, y1, x2, y2);

		p.stroke(255);  // typeface more legible on grid
		p.strokeWeight(2);
		p.textSize(txtSz);
		p.textFont(fira);

		p.textAlign(p.RIGHT, p.BOTTOM);
		p.text("(x1,y1)", x1+10, y1-10);

		p.textAlign(p.CENTER, p.TOP);
		p.text("(x2,y2)", x2+5, y2+10);
	};
};

var ellipseSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize, canvasSize);
		canvas.parent("ellipse-canvas");
		p.strokeWeight(0.25);
		p.push();
		p.translate(canvasSize/15, canvasSize/15);

		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}
		p.pop();

		var x = p.width/2;
		var y = p.width/2;
		p.stroke("#000000");
		p.strokeWeight(2);
		p.fill(p5PinkLight);
		p.ellipse(x, y, gridSize / 10 * 6.5, gridSize / 10 * 6.5);

		p.noStroke();
		p.fill("#000000");
		p.ellipse(x, y, gridSize/20, gridSize/20);

		p.textSize(txtSz);
		p.textFont(fira);
		p.noStroke();
		p.textAlign(p.CENTER, p.BOTTOM);
		p.text("(x,y)", x, y-10);

		p.stroke(255);
		p.strokeWeight(2);
		p.push();
		p.translate(p.width/2, p.height/2 + (gridSize / 10 * 6.5)/2 + 7);
		p.textAlign(p.CENTER, p.TOP);
		p.text(terms.width, 0, 0);
		p.pop();

		p.push();
		p.translate(p.width/2, p.height/2);
		p.rotate(-p.PI/2);
		p.textAlign(p.CENTER, p.TOP);
		p.text(terms.height, 0, (gridSize / 10 * 6.5)/2 + 7);
		p.pop();
	};
};

var rectSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize, canvasSize);
		canvas.parent("rect-canvas");
		p.strokeWeight(0.25);
		p.textSize(txtSz);
		p.textFont(fira);
		p.push();
		p.translate(canvasSize/20, canvasSize/15);

		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}

		var x = gridSize / 10 * 2;
		var y = gridSize / 10 * 2;
		p.stroke("#000000");
		p.strokeWeight(2);

		p.fill(p5PinkLight);
		p.rect(x, y, gridSize / 10 * 5, gridSize / 10 * 5);

		p.noStroke();
		p.fill("#000000");
		p.ellipse(x, y, gridSize/20, gridSize/20);

		p.stroke(255);
		p.strokeWeight(2);
		p.textAlign(p.CENTER, p.BOTTOM);
		p.text("(x,y)", x, y-10);
		p.pop();

		p.stroke(255);
		p.strokeWeight(2);

		p.push();
		p.translate(p.width/2, p.height/2);
		p.textAlign(p.CENTER, p.TOP);
		p.text(terms.width, -10, (gridSize/10*5) / 2);
		p.pop();

		p.push();
		p.translate(p.width/2, p.height/2);
		p.rotate(-p.PI/2);
		p.text(terms.height, -25, (gridSize/10*5) / 2 + 7);
		p.pop();
	};
};

var arcSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize, canvasSize);
		canvas.parent("arc-canvas");
		p.strokeWeight(0.25);
		p.push();
		p.translate(canvasSize/15, canvasSize/15);

		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}
		p.pop();

		p.push();
		var x = 0;
		var y = 0;
		p.fill(p5PinkLight);
		p.stroke("#000000");
		p.strokeWeight(2);
		p.translate(p.width/2, p.height/2);
		p.arc(x, y, gridSize / 10 * 7, gridSize / 10 * 7, p.PI / 2, 2 * p.PI);

		p.noStroke();
		p.fill("#000000");
		p.ellipse(0, 0, gridSize/20, gridSize/20);
		p.pop();

		p.push();
			p.translate(p.width/2, p.height/2);
			p.textSize(txtSz);
			p.textFont(fira);
			p.textAlign(p.CENTER, p.BOTTOM);
			p.text("(x,y)", 0, -15);

			p.stroke(255);
			p.strokeWeight(2);

			p.textAlign(p.CENTER, p.TOP);
			p.text(terms.width, 0, gridSize / 10 * 7.5 / 2 );

			p.text(terms.stop, gridSize / 10 * 6.5 / 4 + 4, 1)

			p.push();
				p.noStroke();
				p.rotate(p.PI/2);
				p.text(terms.start, gridSize / 10 * 7.0 / 4 - 4, 2);
			p.pop();

			p.push();
				p.rotate(-p.PI/2);
				p.textAlign(p.CENTER, p.BOTTOM);
				p.text(terms.height, 0, -gridSize / 10 * 7.5 / 2 );
			p.pop();
		p.pop();
	};
};

var vertexSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize, canvasSize);
		canvas.parent("vertex-canvas");
		p.strokeWeight(0.25);
		p.translate(canvasSize/15, canvasSize/15);

		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}

		var x1 = gridSize / 10 * 3;
		var y1 = gridSize / 10 * 2;
		var x2 = gridSize / 10 * 7;
		var y2 = gridSize / 10 * 6;
		var x3 = gridSize / 10 * 2;
		var y3 = gridSize / 10 * 8;

		p.fill(p5PinkLight);
		p.stroke("#000000");
		p.strokeWeight(2);
		p.beginShape();
			p.vertex(x1, y1);
			p.vertex(x2, y2);
			p.vertex(x3, y3);
		p.endShape(p.CLOSE);

		p.noStroke();
		p.fill("#000000");
		p.ellipse(x1, y1, gridSize/20, gridSize/20);
		p.ellipse(x2, y2, gridSize/20, gridSize/20);
		p.ellipse(x3, y3, gridSize/20, gridSize/20);

		p.stroke(255);
		p.strokeWeight(2);

		p.textAlign(p.CENTER, p.BOTTOM);
		p.textSize(txtSz);
		p.textFont(fira);
		p.text("(x1,y1)", x1 +7, y1 - 7);

		p.textAlign(p.CENTER, p.TOP);
		p.text("(x2,y2)", x2+7, y2 + 10);
		p.text("(x3,y3)", x3+7, y3 + 7);
	};
};

var textSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(canvasSize, canvasSize);
		canvas.parent("text-canvas");
		p.strokeWeight(0.25);
		p.translate(canvasSize/15, canvasSize/15);

		var gridSize = canvasSize - 2 * canvasSize / 15;
		for(var x=0; x<=10; x++){
			p.line(gridSize / 10 * x, 0, gridSize / 10 * x, gridSize);
		}
		for(var y=0; y<=10; y++){
			p.line(0, gridSize / 10 * y, gridSize, gridSize / 10 * y);
		}

		var x1 = gridSize / 10 * 2;
		var y1 = gridSize / 10 * 5;
		var x2 = gridSize / 10 * 7;
		var y2 = gridSize / 10 * 6;
		var x3 = gridSize / 10 * 2;
		var y3 = gridSize / 10 * 7;

		p.stroke(255);
		p.strokeWeight(1);
		p.textSize(canvasSize/4);
		p.fill(p5Pink);
		p.text(terms.string, x1, y1);

		p.noStroke();
		p.fill(0);
		p.ellipse(x1, y1, gridSize/20, gridSize/20);

		p.stroke(255);
		p.strokeWeight(2);
		p.textAlign(p.CENTER, p.TOP);
		p.textSize(txtSz);
		p.textFont(fira);
		p.text("(x,y)", x1 + 2, y1 + 7);
	};
};

var ifelseSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(220, 190);
		canvas.parent("ifelse-canvas");
		p.rectMode(p.CENTER);

		var diagT = 15;
		var diagX = p.width * 0.45; // diagram horizontal center
		var blockW = 90;
		var blockH = 30;
		var testY = diagT + blockH/2;
		var statementsY = testY + blockH*2;

		p.noFill();

		// test
		p.beginShape();
			p.vertex(diagX, testY-blockH/2);
			p.vertex(diagX+blockW/2, testY);
			p.vertex(diagX, testY+blockH/2);
			p.vertex(diagX-blockW/2, testY);
		p.endShape(p.CLOSE);
		// statements
		p.rect(diagX, statementsY, blockW, blockH);
		// test-continue arrow
		drawArrow(p, diagX+blockW*0.5, testY, 0, blockW*0.25, 90, blockH*3.25, 180, blockW*0.75);
		// test-statements arrow
		drawArrow(p, diagX, testY+blockH/2, 90, blockH);
		// statements-continue arrow
		drawArrow(p, diagX, statementsY+blockH/2, 90, blockH*1.75);

		// texts
		p.textFont(fira);
		p.textAlign(p.CENTER, p.CENTER);
		p.noStroke();
		p.fill(0);
		p.text(terms.test, diagX, testY-2);
		p.text(terms.false, diagX+blockW*0.75, testY-14);
		p.text(terms.true, diagX+21, testY+blockH*0.75);
		p.text(terms.statements, diagX, statementsY-2);
		p.text(terms.continue_program, diagX, statementsY+blockH*2.5);
	};
};

var forloopSketch = function(p){
	var canvas;

	var fira;
	p.preload = function(){
		fira = p.loadFont(fontFile);
	}

	p.setup = function(){
		canvas = p.createCanvas(220, 305);
		canvas.parent("forloop-canvas");
		p.rectMode(p.CENTER);

		var diagT = 15;
		var diagX = p.width * 0.45; // diagram horizontal center
		var blockW = 90;
		var blockH = 30;
		var initY = diagT+blockH/2;
		var testY = initY + blockH*2;
		var statementsY = testY + blockH*2;
		var updateY = statementsY + blockH*2;

		p.noFill();

		// init
		p.rect( diagX, initY, blockW, blockH, blockH/2 );
		// test
		p.beginShape();
			p.vertex(diagX, testY-blockH/2);
			p.vertex(diagX+blockW/2, testY);
			p.vertex(diagX, testY+blockH/2);
			p.vertex(diagX-blockW/2, testY);
		p.endShape(p.CLOSE);
		// statements
		p.rect(diagX, statementsY, blockW, blockH);
		// update
		p.rect(diagX, updateY, blockW, blockH);
		// init-test arrow
		drawArrow(p, diagX, initY+blockH/2, 90, blockH);
		// test-continue arrow
		drawArrow(p, diagX+blockW*0.5, testY, 0, blockW*0.25, 90, blockH*5.5, 180, blockW*0.75, 90, blockH*0.75);
		// test-statements arrow
		drawArrow(p, diagX, testY+blockH/2, 90, blockH);
		// statements-update arrow
		drawArrow(p, diagX, statementsY+blockH/2, 90, blockH);
		// update-test arrow
		drawArrow(p, diagX, updateY+blockH/2, 90, blockH*0.5, 180, blockW*0.75, 270, blockH*5, 0, blockW*0.25);

		// texts
		p.textFont(fira);
		p.textAlign(p.CENTER, p.CENTER);
		p.noStroke();
		p.fill(0);
		p.text(terms.init, diagX, initY-2);
		p.text(terms.test, diagX, testY-2);
		p.text(terms.false, diagX+blockW*0.75, testY-14);
		p.text(terms.true, diagX+21, testY+blockH*0.75);
		p.text(terms.statements, diagX, statementsY-2);
		p.text(terms.update, diagX, updateY-2);
		p.text(terms.continue_program, diagX, updateY+blockH*2.5);
	};
};

new p5(colormodeSketch);
new p5(gridSketch);
new p5(anglesSketch);
new p5(lineSketch);
new p5(ellipseSketch);
new p5(rectSketch);
new p5(arcSketch);
new p5(vertexSketch);
new p5(textSketch);
new p5(ifelseSketch);
new p5(forloopSketch);
