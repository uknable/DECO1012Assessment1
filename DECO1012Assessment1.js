var columns = 3;
var rows = 2;
var points = []; 
var reference = [];
var pieceWidth, pieceHeight;
var jigsaw;
var placeholderPiece;
var nowHolding = false;
var gameEnd = false;
var clickedPiece, currentPiece;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jigsaw = createGraphics(windowWidth, windowHeight);
  pieceWidth = width/columns; // pieceWidth and pieceHeight will be used to create the coords where the
  pieceHeight = height/rows;     // jigsaw pieces will be drawn from
  placeholderPiece = createGraphics(pieceWidth, pieceHeight); //this graphic will replace the puzzle that was picked
  PopulatePoints(); //gives the points array the coords where jigsaw pieces will be drawn
  DrawPlaceholder();
}

function draw() { 
  DrawFlower();
  DrawJigs();

  if(nowHolding) {
    PickupPiece(clickedPiece);
  }

  MouseType();
}

function MouseType() {
  if(nowHolding) {
    cursor(MOVE);
  } else {
    cursor(HAND);
  }
}

function PopulatePoints() {
  for(var i=0; i<columns; i++) {
    for(var j=0; j<rows; j++) {
      var point = [i*pieceWidth, j*pieceHeight];
      points.push(point);
    }
  }
  reference = points; //reference array stores correct order of coords
  points = shuffle(points); //shuffle the pieces, commented out for testing graphic
}

function DrawPlaceholder() {
  placeholderPiece.background(100);
}

function DrawFlower() { //test graphic
  //jigsaw.noStroke();
  jigsaw.background(255);/*
  for(var i=points.length; i>0; i--) {
    switch (i%2) {
      case 0:
        jigsaw.fill(255);
        break;
      default:
        jigsaw.fill(0);
        break;
    }
    jigsaw.ellipse(width/2, height/2, i*width/points.length);
  }*/
  jigsaw.strokeWeight(5);
  for(var i=0; i<height; i+=20) {
    for(var j=0; j<width; j+=20) {
      jigsaw.point(j+(frameCount%pieceWidth), i);
    }
  }
}

function DrawJigs() {
  for(var i=0; i<reference.length; i++) {
    image(jigsaw, reference[i][0], reference[i][1], pieceWidth, pieceHeight,
          points[i][0], points[i][1], pieceWidth, pieceHeight);
  }
}

function mouseClicked() {
  clickedPiece = AreaCheck();

  if(nowHolding) {
    SwapPiece(clickedPiece);
    nowHolding = false;
  } else {
    PickupPiece(clickedPiece);
    currentPiece = clickedPiece;
    nowHolding = true;
  }
}

function AreaCheck() {
  var whichPiece;

  for(var i=0; i<reference.length; i++) {
    if(mouseX > reference[i][0] && mouseX < reference[i][0]+pieceWidth &&
       mouseY > reference[i][1] && mouseY < reference[i][1]+pieceHeight) {
      whichPiece = i;
      print(whichPiece);
    }
  }
  return whichPiece;
}

function PickupPiece(piece) {  
  image(placeholderPiece, reference[piece][0], reference[piece][1], pieceWidth, pieceHeight,
        0, 0, pieceWidth, pieceHeight);
  image(jigsaw, mouseX-pieceWidth/2, mouseY-pieceHeight/2, pieceWidth, pieceHeight,
        points[piece][0], points[piece][1], pieceWidth, pieceHeight);
}

function SwapPiece(piece) {
  var swapZone;
  swapZone = points[piece];
  points[piece] = points[currentPiece];
  points[currentPiece] = swapZone;
  CheckWinCondition(); //check if player finished puzzle;
}

function CheckWinCondition() {
  for(var i=0; i<points.length; i++) {
    if(points[i] != reference[i]) {
      gameEnd = false;
      return; //gets out of the function if a piece is not in the right spot
    }
  }
  gameEnd = true;
  print(gameEnd);
}