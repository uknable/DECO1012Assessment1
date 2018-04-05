var columns = 3;
var rows = 2;
var points = []; 
var reference = [];
var pieceWidth, pieceHeight, img;
var jigsaw;
var square;
var holdingPiece = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jigsaw = createGraphics(windowWidth, windowHeight);
  pieceWidth = width/columns; // pieceWidth and pieceHeight will be used to create the coords where the
  pieceHeight = height/rows;     // jigsaw pieces will be drawn from
  noLoop();
}

function draw() {
  PopulatePoints(); //gives the points array the coords where jigsaw pieces will be drawn
  DrawCircles(); //for initial testing, will be replaced
  SawJigs();
  print(reference);
}

function PopulatePoints() {
  for(var i=0; i<columns; i++) {
    for(var j=0; j<rows; j++) {
      var point = [i*pieceWidth, j*pieceHeight];
      points.push(point);
    }
  }
  reference = points; //reference array stores correct order of coords, points will be shuffled in SawJigs()
  print(points);
}

function DrawCircles() {
  jigsaw.background(0);
  jigsaw.noStroke();
  for(var k=points.length; k>0; k--) {
    switch (k%2) {
      case 0:
        jigsaw.fill(255);
        break;
      default:
        jigsaw.fill(0);
    }
    jigsaw.ellipse(width/2, height/2, k*width/points.length*(frameCount%10));
  }
}

function SawJigs() {
  points = shuffle(points);
  for(var i=0; i<reference.length; i++) {
    image(jigsaw, reference[i][0], reference[i][1], pieceWidth, pieceHeight,
          points[i][0], points[i][1], pieceWidth, pieceHeight);
  }
}

function mouseClicked() {
  /*if(holdingPiece) {
    DropPiece();
  } else {
    PickupPiece();
  }*/
  
  AreaCheck();
}

function AreaCheck() {
  for(var i=0; i<reference.length; i++) {
    if(mouseX > reference[i][0] && mouseX < reference[i][0]+pieceWidth &&
       mouseY > reference[i][1] && mouseY < reference[i][1]+pieceHeight) {
      print("area"+i);
    }
  }
}

