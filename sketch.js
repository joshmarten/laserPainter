var cornerDistance; //diagonal distance from cursor to nearest window corner
var canvasDiagonal; //diagonal distance from center of canvas to corners of canvas

var xMiddle; //x-coordinate of canvas center
var yMiddle; //y-coordinate of canvas center

var c; //line color
var w; //line width

var counter = 0;
var currentTime;
var lastTime;
var interval = 1000;


function setup() {

	noCursor();

	createCanvas(windowWidth, windowHeight);
	background(255);

	xMiddle = windowWidth / 2;
	yMiddle = windowHeight / 2;

	c = color(random(255), random(255), random(255));
	w = 5;

	canvasDiagonal = sqrt((windowWidth * windowWidth / 4) + (windowHeight * windowHeight / 4));

	lastTime = millis();


}

function draw() {

	//start counter
	currentTime = millis();
	if (currentTime - lastTime > interval) {
		lastTime = currentTime;
		counter = counter + 1;
	}

	//display startup message
	if (counter < 4) {
		textAlign(CENTER);
		textSize(windowHeight / 20);
		fill(50);
		text("CLICK AND DRAG", windowWidth / 2, windowHeight / 2);
		textAlign(CENTER);
		textSize(windowHeight / 40);
		fill(50);
		text("PRESS ANY KEY TO CLEAR",windowWidth/2,windowHeight/2+windowHeight/20);
	} else if (counter == 4) {
		noStroke();
		fill(255);
		rect(0, 0, windowWidth, windowHeight);
	} else if (counter > 4) {


		//lines from center
		if (mouseIsPressed) {
			stroke(c);
			strokeWeight(w);
			line(xMiddle, yMiddle, mouseX, mouseY);
			w = w + 1;
		} else {
			w = 5;
			c = color(random(255), random(255), random(255));
			line(xMiddle, yMiddle, mouseX, mouseY);
		}

		//lines from corners
		if (mouseX <= windowWidth / 2 && mouseY <= windowHeight / 2) { //top left corner
			cornerDistance = sqrt(mouseX * mouseX + mouseY * mouseY); //measure distance to corner
			strokeWeight((canvasDiagonal / cornerDistance) * (canvasDiagonal / cornerDistance)); //adjusting weight based on distance to corner
			if (mouseIsPressed) {
				stroke(c);
				line(0, 0, mouseX, mouseY);
			} else {
				stroke(random(255), random(255), random(255), random(255));
				line(0, 0, mouseX, mouseY);
			}
		} else if (mouseX > windowWidth / 2 && mouseY <= windowHeight / 2) { //top right corner
			cornerDistance = sqrt((windowWidth - mouseX) * (windowWidth - mouseX) + mouseY * mouseY);
			strokeWeight((canvasDiagonal / cornerDistance) * (canvasDiagonal / cornerDistance));
			if (mouseIsPressed) {
				stroke(c);
				line(windowWidth, 0, mouseX, mouseY);
			} else {
				stroke(random(255), random(255), random(255), random(255));
				line(windowWidth, 0, mouseX, mouseY);
			}
		} else if (mouseX <= windowWidth / 2 && mouseY > windowHeight / 2) { //bottom left corner
			cornerDistance = sqrt(mouseX * mouseX + (windowHeight - mouseY) * (windowHeight - mouseY));
			strokeWeight((canvasDiagonal / cornerDistance) * (canvasDiagonal / cornerDistance));
			if (mouseIsPressed) {
				stroke(c);
				line(0, windowHeight, mouseX, mouseY);
			} else {
				stroke(random(255), random(255), random(255), random(255));
				line(0, windowHeight, mouseX, mouseY);
			}
		} else if (mouseX > windowWidth / 2 && mouseY > windowHeight / 2) { //bottom right corner
			cornerDistance = sqrt((windowWidth - mouseX) * (windowWidth - mouseX) + (windowHeight - mouseY) * (windowHeight - mouseY));
			strokeWeight((canvasDiagonal / cornerDistance) * (canvasDiagonal / cornerDistance));
			if (mouseIsPressed) {
				stroke(c);
				line(windowWidth, windowHeight, mouseX, mouseY);
			} else {
				stroke(random(255), random(255), random(255), random(255));
				line(windowWidth, windowHeight, mouseX, mouseY);
			}
		}

		//clear canvas
		if (keyIsPressed === true) {
			noStroke();
			fill(255);
			rect(0, 0, windowWidth, windowHeight);
		}
	}
}