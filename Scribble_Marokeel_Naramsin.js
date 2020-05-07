/**
 * JS for the Scribble Web App
 * Copyright Dan Mazzola and ABOR
 */

"use strict";				// best practice to use this directive

// Global variables and Constants

var canvas;					// the canvas element
var context;				// the drawing context

var coordinateLabel;		// information div labels
var mouseInOutLabel;		
var mouseUpDownLabel;
var drawColorLabel;
var lineWidthLabel

var insideCanvas = false;	// pointer inside canvas?
var drawingMode = false; 	// drawing or moving?
var currX = 0, currY = 0;	// Where the mouse is
var prevX = 0, prevY = 0;	// Where the mouse was

const inactiveCanvasBorder = "2px solid #c3c3c3";
const activeCanvasBorder   = "2px solid #000000";


function initialize() {

	// Initialize our labels
	coordinateLabel 	= document.getElementById("coordinatesId");
	mouseInOutLabel 	= document.getElementById("mouseInOutId");
	mouseUpDownLabel	= document.getElementById("mouseUpDownId"); 
	drawColorLabel 		= document.getElementById("drawColorId"); 
	lineWidthLabel 		= document.getElementById("lineWidthId");

	// Get the canvas and set the 2d drawing context
	canvas = document.getElementById('drawingCanvasId');
	context = canvas.getContext('2d');
	context.lineCap = "round"

	// set inital canvas state, drawing color and linewidth
	setColor('red');
	setLineWidth('1');
}

function clearCanvas() {
	// The following hard coded values are dependent on the size of canvas
	if(confirm('Are you sure you want to clear?') == true){

		context.clearRect(0, 0, 500, 500);
		context.fillText("Copyright Dan Mazzola & ABOR", 350, 495)
	}

}

// (1) set the line drawing color (strokeStyle)
function setColor(color) {
	switch(color) {
		case "red":
			context.strokeStyle="red";
			break;
		case "blue":
			context.strokeStyle="blue";
			break;
		case "skyblue":
			context.strokeStyle="skyblue";
			break;
		case "gradient":
			var gradient = context.createLinearGradient(0,0,500,500);
			gradient.addColorStop(0,"red");
			gradient.addColorStop(.5,"blue");
			gradient.addColorStop(1,"skyblue")
		
			context.strokeStyle = gradient;
			context.lineWidth = 1;
			context.stroke(0,0,200,500);
			break;
	}
	drawColorLabel.innerHTML = "Drawing Color is " + color;
}

// (2) set the line width
function setLineWidth(width) {
	context.lineWidth = width;
	lineWidthLabel.innerHTML = "Drawing Line " + width + " pixles wide";
}

// (3) handle mouse move events
function mouseMoved(event) {
	// what happens when the mouse is moved?
	prevX = currX;
	prevY = currY;
	currX = event.clientX - canvas.offsetLeft;
	currY = event.clientY - canvas.offsetTop;
	coordinateLabel.innerHTML = "Coordinates: (" + currX + ", " + currY + ")";
	drawLine();
}

// (4) draw the line when appropriate
function drawLine() {
	if (insideCanvas && drawingMode) {
		context.beginPath();
		context.moveTo(prevX, prevY);
		context.lineTo(currX, currY);
		context.stroke();
		context.closePath();
	}
}

// (5) handle the mouse entered event
function mouseEnteredCanvas(event) {
	mouseInOutLabel.innerHTML = "Mouse inside of Canvas";
	document.body.style.cursor = 'crosshair';
	canvas.style.border = activeCanvasBorder;
	insideCanvas = true;
}

// (6) handle the mouse left event
function mouseLeftCanvas(event) {
	coordinateLabel.innerHTML = "Coordinates:";
	mouseInOutLabel.innerHTML = "Mouse outside of Canvas";
	document.body.style.cursor = 'auto';
	canvas.style.border = inactiveCanvasBorder;
	insideCanvas = false;
}

// (7) Handle the mouse down event
function startDrawing(event) {
	drawingMode = true;
	mouseUpDownLabel.innerHTML = "Mouse Button Down (drawing mode)";
}

// (8) Handle the mouse up event
function stopDrawing(event) {
	drawingMode = false;
	mouseUpDownLabel.innerHTML = "Mouse Button Up (moving mode)";
}



