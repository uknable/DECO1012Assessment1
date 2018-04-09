/*
In his book ‘A Beginner’s Guide to Constructing the Universe’, Michael S. Schneider writes that the peoples of ancient civilisations learned about 
the spiritual quality of numbers and served as a moral guideline. This is far different to the mathematics taught in modern times where we are taught 
numbers to merely manipulate quantities. Back in ancient times, mathematics was taught in tandem with philosophy as it was believed that numbers and 
geometry held lessons about the nature of the universe. For example, the number one was symbolised by a circle with a dot in the middle and was 
considered to be the precursor to all subsequent numbers and their symbolic representations of which the universe was constructed (Schneider, 1995)[1].

The Self as described by psychologist Carl Jung is also represented by a circle with a dot in the middle. The dot represents the ego which is the 
subject of an individual’s consciousness while the outer circle reflects the Self which is the subject of the individual’s whole totality that 
includes the unconscious as well as the consciousness(Jung, Adler & Hull, 2014)[2]. Jungian psychology also defines the term individuation as the 
“development of the psychological individual as a differentiated being from the general, collective psychology”(Jung, Adler & Hull, 2014)[3]. 

I wanted to use this as the basis of this assignment creating a jigsaw puzzle of a circle and the journey toward it’s solution to represent the 
process of individuation but I decided that circles looked a bit boring so I drew inspiration from my lifelong fixation of flowers to make it look 
more interesting.


1. Schneider, M. (1995). A beginner's guide to constructing the universe (p. i-2). New York: Harper Perennial.
2. Jung, C., Adler, G., & Hull, R. (2014). Collected Works of C.G. Jung, Volume 6: Psychological Types: 
   Psychological Types (3rd ed., pp. 540). Princeton University Press.
3. Jung, C., Adler, G., & Hull, R. (2014). Collected Works of C.G. Jung, Volume 6: Psychological Types: 
   Psychological Types (3rd ed., pp. 561-562). Princeton University Press.

Also included github repo for this assessment: https://github.com/uknable/DECO1012Assessment1, https://github.com/uknable/1012Assessment1Flower
*/

//change these to change the amount of pieces on the board
var columns = 2;
var rows = 2;

var points = []; 
var reference = [];
var pieceWidth, pieceHeight;
var jigsaw;
var placeholderPiece;
var nowHolding = false;
var gameEnd = false;
var clickedPiece, currentPiece;
//flower
var petals = 14; // amount of petals
var angleSlice; //will determine the angle with which a petal will be drawn
//arrays for petal verticies
var pointsFeet = [];
var pointsShoulders = [];
var pointsHead = [];
//for noise
var xoff = 0;
var yoff = 0;
var noiseVar;
//for end of puzzle graphic
var counter = 0; //used for lerping colour and position of petals
var noiseArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  jigsaw = createGraphics(windowWidth, windowHeight);//this allows the canvas to be split into pieces
  pieceWidth = width/columns; // pieceWidth and pieceHeight will be used to create the coords where the jigsaw pieces will be drawn from
  pieceHeight = height/rows;  
  placeholderPiece = createGraphics(pieceWidth, pieceHeight); //this graphic will replace the puzzle that was picked
  PopulatePoints(); //gives the points array the coords where jigsaw pieces will be drawn
  DrawPlaceholder();
  angleSlice = radians(360/petals);
  jigsaw.noStroke();
}

function draw() { 
  jigsaw.background(255);

  GenerateFlower();
  DrawJigs(); //draws the jigsaw pieces on the canvas

  if(nowHolding) { //sets piece to cursor if a piece is currently picked up
    PickupPiece(clickedPiece);
  }

  MouseType(); //switches between cursors if a piece is currently being held
  UI(); //to show instructions
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//the flower
function GenerateFlower() {
  xoff = xoff + 0.005;
  FlowerPoints(); //populates array which FlowerPetals will use to draw the individual petals
  FlowerPetals(); //draws the individual petals
}

function FlowerPoints() {
  pointsFeet = [];
  pointsShoulders = [];
  pointsHead = [];

  //petal shape
  var feet = 300; 
  var shoulders = 1000; 
  var head = 1500; 

  for(var i=0; i<petals; i++) {
    var angle = angleSlice * i + (frameCount * 0.005);
    //petal feet
    //the following *2 and *3 were hacky solutions to the problem I faced when porting over the flower code from another file
    //I wasn't able to use translate on jigsaw so I fiddled around with some numbers until it looked okay. I setted on 2 and 3
    var x1 = map(cos(angle), -1, 1, -feet*2, feet*2)+width*3; 
    var y1 = map(sin(angle), -1, 1, -feet*2, feet*2)+height*3;
    //petal shoulders
    var x2 = map(cos(angle), -1, 1, -shoulders*2, shoulders*2)+width*3;
    var y2 = map(sin(angle), -1, 1, -shoulders*2, shoulders*2)+height*3;
    //petal head
    var angleTip = angle + angleSlice/2;
    var x3 = map(cos(angleTip), -1, 1, -head*2, head*2)+width*3;
    var y3 = map(sin(angleTip), -1, 1, -head*2, head*2)+height*3;

    pointsFeet.push([x1, y1]);
    pointsShoulders.push([x2, y2]);
    pointsHead.push([x3, y3]);
  }
}

function FlowerPetals() {  
  for(var i=0; i<pointsFeet.length; i++) {
    yoff = noise(xoff, i*2);
    var noiseyColour = color(255*yoff, 255*yoff, 255*yoff);

    //creates different flower if puzzle is completed
    if (gameEnd == false) {
      counter = 0; //so you can watch the ending animation again if you mess up the puzzle after completion
      jigsaw.fill(noiseyColour); //gives individual petals their own colour
      noiseVar = map(noise(xoff, yoff), 0, 1, -0.1, 0.4); //change this to vary the position of the petals
      noiseArray[i] = noiseVar;
    } else {
      counter++;
      //lerps colour
      var currentLerp = map(counter, 0, 4000, 0, 1);
      var colourTo = color(255-20*i, 255-10*i, 255-5*i);
      var currentColour = lerpColor(noiseyColour, colourTo, currentLerp);
      jigsaw.fill(currentColour);
      //lerps petal position
      var noiseVarTo = 0.2;
      var noiseSnapshot = noiseVar;
      //I had to introduce the following if-statement to keep the flower in the final position
      //it has to do with counter always incrementing(line 107). Alternatively, I could clamp counter to a specific range
      if(noiseVar != 0.2) {
        noiseVar = lerp(noiseArray[i], noiseVarTo, currentLerp);
      } else {
        noiseVar = 0.2;
      }
    }
    //this switch statement stitches the end of the array to the start of the array which is necessary because each drawing
    //of a petal relies on the petal next to it
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
//I was going to use this function to create petals that would fall from one corner of the screen to the other but that idea was
//scrapped as it didn't look too good
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

function PopulatePoints() { //creates the coords for the jigsaw
  for(var i=0; i<columns; i++) {
    for(var j=0; j<rows; j++) {
      var point = [i*pieceWidth, j*pieceHeight];
      points.push(point);
    }
  }
  reference = points; //reference array stores correct order of coords
  points = shuffle(points); //shuffle the jigsaw pieces
}

function DrawPlaceholder() { //this is to replace the piece that was picked up
  placeholderPiece.background(100);
}

function DrawJigs() { //uses the correct coords and pastes the pieces reflected from the shuffled coords
  for(var i=0; i<reference.length; i++) {
    image(jigsaw, reference[i][0], reference[i][1], pieceWidth, pieceHeight,
          points[i][0], points[i][1], pieceWidth, pieceHeight);
  }
}

function mouseClicked() { //if mouse is clicked, pick up piece if not holding or drop if holding
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

function AreaCheck() { //checks and returns what area on the canvas you clicked on
  var whichPiece;

  for(var i=0; i<reference.length; i++) { //the canvas area of each piece
    if(mouseX > reference[i][0] && mouseX < reference[i][0]+pieceWidth &&
       mouseY > reference[i][1] && mouseY < reference[i][1]+pieceHeight) {
      whichPiece = i;
    }
  }
  return whichPiece;
}

function PickupPiece(piece) {  //puts the grey placeholder graphic on the area you clicked on and puts the piece on your cursor
  image(placeholderPiece, reference[piece][0], reference[piece][1], pieceWidth, pieceHeight,
        0, 0, pieceWidth, pieceHeight);
  image(jigsaw, mouseX-pieceWidth/2, mouseY-pieceHeight/2, pieceWidth, pieceHeight,
        points[piece][0], points[piece][1], pieceWidth, pieceHeight);
}

function SwapPiece(piece) { //swaps the piece you're holding with the piece you clicked on, checks if you finished
  var swapZone;
  swapZone = points[piece];
  points[piece] = points[currentPiece];
  points[currentPiece] = swapZone;
  CheckWinCondition(); //check if player finished puzzle;
}

function CheckWinCondition() {
  for(var i=0; i<points.length; i++) {
    if(points[i] != reference[i]) { //checks every coordinate of the shuffled array against reference array
      gameEnd = false;
      return; //gets out of the function if a piece is not in the right spot
    }
  }
  gameEnd = true; //used in the GenerateFlower() function
}

function UI() { //instructions
  if (gameEnd == false) {
    textSize(15);
    text("Click to pick up a piece", width-200, 20);
    text("Click again to drop a piece", width-200, 40);
    text("Finish the jigsaw!", width-200, 60);
    text("Change the 'rows' and 'columns' variables in the code to affect the amount of pieces that appear on the board", width/2-200, height-10);
  }
}
