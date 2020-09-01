var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 15;
var ballSpeedY = 4;
var framesPerSecond = 30;
var paddle1Y =250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;
var showingWinScreen = false;

function handleMouseClick(evt) {
	if(showingWinScreen) {
		player1Score = 0;
		player2Score = 0;
		showingWinScreen = false;
	}
}

window.onload = function() {
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');
setInterval(function() {
    moveEverything();	
    drawEverything();
    } ,1000/framesPerSecond);

canvas.addEventListener('mousedown',handleMouseClick);

canvas.addEventListener('mousemove', 
	function(evt) {
      var mousePos = calculateMousePos(evt);
      paddle1Y = mousePos.y- (PADDLE_HEIGHT/2);
	});
}

function ballReset() {
	if(player1Score >= WINNING_SCORE  || 
		player2Score >= WINNING_SCORE) {
	    showingWinScreen = true;
	}
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}

function computerMov() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY - 35) {
		paddle2Y += 6;
	} else if(paddle2YCenter > ballY + 35)
	{
		paddle2Y -= 6;
	}
}

function moveEverything() {
	if(showingWinScreen) {
		return;
	}
computerMov();
	ballX += ballSpeedX;
	ballY += ballSpeedY;
	if (ballX > canvas.width) {
		if(ballY < paddle2Y + PADDLE_HEIGHT && ballY > paddle2Y) {
    		ballSpeedX = -ballSpeedX;
    		var deltaY = ballY- (paddle1Y + PADDLE_HEIGHT/2);
    		ballSpeedY = deltaY * 0.05;
    	}
    	else {
    		player1Score++;
    		ballReset();
    		
    	}	
			}
    if (ballX < 0) {
    	if(ballY < paddle1Y + PADDLE_HEIGHT && ballY > paddle1Y) {
    		ballSpeedX = -ballSpeedX;
    		var deltaY = ballY- (paddle2Y + PADDLE_HEIGHT/2);
    		ballSpeedY = deltaY * 0.05;
    	 	}
    	else {
    		player2Score++;
    		ballReset();
    		
    	}	
	}

	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
		}
    if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawNet() {
	for(var i=0;i<canvas.height;i+=40) {
		colorRect(canvas.width/2-1,i,2,20,'white');
	}
}

function drawEverything() {

//canvas
colorRect(0,0,canvas.width,canvas.height,'black');

if(showingWinScreen) {
	canvasContext.fillStyle = 'white';

	if(player1Score >= WINNING_SCORE) {
      canvasContext.fillText("You Won!",750,200);
	} else if(player2Score >= WINNING_SCORE) {
      canvasContext.fillText("Computer Won!",750,200);
	}
		canvasContext.fillText("Click to Continue",750,500);
		return; 
	}

//Net
	drawNet();

//left paddle
colorRect(0,paddle1Y,PADDLE_THICKNESS,100,'white');

//right paddle
colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,100,'white');

//ball
colorCircle(ballX,ballY,10,'white');

//score
canvasContext.fillText(player1Score,100,100);
canvasContext.fillText(player2Score,canvas.width - 100,100);
}

function colorRect(leftX,topY,width,height,drawcolor) {
canvasContext.fillStyle = drawcolor;
canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle(centerX,centerY,radius,drawcolor) {
canvasContext.fillStyle = drawcolor;
canvasContext.beginPath();
canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
canvasContext.fill();
}

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
    	x:mouseX,
    	y:mouseY,
    };
}