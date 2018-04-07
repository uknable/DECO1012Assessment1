var columns = 1;
var rows = 1;
var points = []; 
var reference = [];
var pieceWidth, pieceHeight;
var jigsaw;
var placeholderPiece;
var nowHolding = false;
var gameEnd = false;
var clickedPiece, currentPiece;
//flower
var petals = 14;
var angleSlice;
//array for petal verticies
var pointsFeet = [];
var pointsShoulders = [];
var pointsHead = [];
//for noise
var xoff = 0;
var yoff = 0;
var noiseVar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jigsaw = createGraphics(windowWidth, windowHeight);
  pieceWidth = width/columns; // pieceWidth and pieceHeight will be used to create the coords where the
  pieceHeight = height/rows;     // jigsaw pieces will be drawn from
  placeholderPiece = createGraphics(pieceWidth, pieceHeight); //this graphic will replace the puzzle that was picked
  PopulatePoints(); //gives the points array the coords where jigsaw pieces will be drawn
  DrawPlaceholder();
  angleSlice = radians(360/petals);
}

function draw() { 
  jigsaw.background(255);
  GenerateFlower();
  DrawJigs();

  if(nowHolding) {
    PickupPiece(clickedPiece);
  }
  MouseType(); 

}

//the flower
function GenerateFlower() {
  xoff = xoff + 0.005;
  FlowerPoints();
  push();
  jigsaw.noStroke();
  FlowerPetals();
  pop();
}

function FlowerPoints() {
  pointsFeet = [];
  pointsShoulders = [];
  pointsHead = [];

  //petal shape
  var feet = 400; 
  var shoulders = 1000; 
  var head = 1500; 

  for(var i=0; i<petals; i++) {
    var angle = angleSlice * i + (frameCount * map(noise(xoff), 0, 1, 0, 0.01));
    //petal feet
    var x1 = map(cos(angle), -1, 1, -feet, feet)+width*2;
    var y1 = map(sin(angle), -1, 1, -feet, feet)+height*2;
    //petal shoulders
    var x2 = map(cos(angle), -1, 1, -shoulders, shoulders)+width*2;
    var y2 = map(sin(angle), -1, 1, -shoulders, shoulders)+height*2;
    //petal head
    var angleTip = angle + angleSlice/2;
    var x3 = map(cos(angleTip), -1, 1, -head, head)+width*2;
    var y3 = map(sin(angleTip), -1, 1, -head, head)+height*2;

    pointsFeet.push([x1, y1]);
    pointsShoulders.push([x2, y2]);
    pointsHead.push([x3, y3]);
  }
}

function FlowerPetals() {  
  for(var i=0; i<pointsFeet.length; i++) {
    yoff = noise(xoff, i*2);
    noiseVar = map(noise(xoff, yoff), 0, 1, 0, 0.4);
    jigsaw.fill(255*yoff);
    switch (i) {
      case (pointsFeet.length-1):
        DrawPetal(pointsFeet[i][0]*noiseVar, pointsFeet[i][1]*noiseVar,
                  pointsShoulders[i][0]*noiseVar, pointsShoulders[i][1]*noiseVar,
                  pointsHead[i][0]*noiseVar, pointsHead[i][1]*noiseVar,
                  pointsShoulders[0][0]*noiseVar, pointsShoulders[0][1]*noiseVar,
                  pointsFeet[0][0]*noiseVar, pointsFeet[0][1]*noiseVar);
        break;
      default:
        DrawPetal(pointsFeet[i][0]*noiseVar, pointsFeet[i][1]*noiseVar,
                  pointsShoulders[i][0]*noiseVar, pointsShoulders[i][1]*noiseVar,
                  pointsHead[i][0]*noiseVar, pointsHead[i][1]*noiseVar,
                  pointsShoulders[i+1][0]*noiseVar, pointsShoulders[i+1][1]*noiseVar,
                  pointsFeet[i+1][0]*noiseVar, pointsFeet[i+1][1]*noiseVar);
        break;
    }
  }
}

function DrawPetal(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
  
  jigsaw.beginShape();
  jigsaw.vertex(x1, y1);
  jigsaw.vertex(x2, y2);
  jigsaw.vertex(x3, y3);
  jigsaw.vertex(x4, y4);
  jigsaw.vertex(x5, y5);
  jigsaw.endShape();
}

//the game
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