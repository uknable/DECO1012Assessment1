//Tuesday 3rd Apr
//jigsaw puzzle flower, starting to test, trying to find out ways to create the jigsaw puzzle look
//seems like createGraphic is the key. Use createGraphic to render a new canvas, draw onto the new canvas, 
//then use image() to create sections of the new canvas and place it on the old canvas as needed.
//Will have to now figure out how to draw different pieces of the puzzle onto the canvas then the drag
//and drop functionality.

var columns = 3;
var rows = 2;
var points = []; 
var reference = [];
var columnWidth, rowHeight, img;
var jigsaw;

function setup() {
  createCanvas(windowWidth, windowHeight);
  jigsaw = createGraphics(windowWidth, windowHeight);
  columnWidth = width/columns; // to feed into PopulatePoints();
  rowHeight = height/rows;
  noLoop();
}

function draw() {
  PopulatePoints(); //gives the points array the coords where image() will be drawn
  DrawCircles(); //for initial testing, will be replaced
}

function PopulatePoints() {
  for(var i=0; i<columns; i++) {
    for(var j=0; j<rows; j++) {
      var point = [i*columnWidth, j*rowHeight];
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
    image(jigsaw, reference[i][0], reference[i][1], columnWidth, rowHeight,
          points[i][0], points[i][1], columnWidth, rowHeight);
  }
}

function mouseClicked() {
  SawJigs();
}