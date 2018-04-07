Hello this is the repo for my DECO1012 Assessment 1 submission proving my work.

03/04/2018
Started work on the project. My idea is a jigsaw puzzle of a flower that is spinning around and sheds petals. At first in its unsolved
state the puzzle will be grayscale. When the puzzle is solved it will have colour and the display will intensify.
I've laid down the groundwork of the initialisation and randomisation of the picture. I've used a placeholder graphic of concentric 
circles to make the randomisation obvious looking.

I will next need to implement the drag and drop functionality that I want my project to have, if that doesn't work then I will have to 
do a click-tile-then-click-tile-to-swap functionality which would be clunkier. After that I will be implementing the flower graphic.
Hopefully it won't be too resource demanding.

05/04/2018
I need to figure out a way to have the different areas of the canvas defined so that the program knows which piece is where. Added 
jigsaw piece area detection. Implemented functionality to have the player able to pickup a piece.
Encountered a mind-bending bug when I wasn't able to pick up the first piece. It was because of this code: 
  if(holdingPiece && clickedPiece) {
    PickupPiece(clickedPiece);
  }
The bug was that if the first piece was clicked then clickedPiece would evaluate was false as clickedPiece held value of 0. 
Now the code is:
  if(holdingPiece) {
    PickupPiece(clickedPiece);
  }
Implemented swapping of the currently held piece with the clicked piece.
Implemented win condition with help from user palswim for his answer on how to check if two arrays are identical
	https://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
Implemented placeholder piece
Now I need to work on the spinning flower. I want the petals to be wavey. The key lies in the 'Noise Wave Array' example from
week 3 (https://www.openprocessing.org/sketch/520719).

06/04/2018
Working on the spinning flower. I am getting the hang of using noise(). I want the unsolved flower to be very irradic and 
somewhat stressful in it's movement to make the payoff of solving the jigsaw better. The solved flower will be very serene
in comparison and colourful. Using vertex() and beginShape() was strange at the start and took some practice to draw the 
petals. Currently working on the petals that the spinning flower will shed. This serves as some reference for the player
to use to solve the outside pieces of the jigsaw puzzle. I decided that instead of shedding petals I will just have shards
radiate from the middle because it would be hard to make it look like a petal with the sharp lines. 
The solved puzzle may not include things radiating from the middle.

07/04/2018
Implemented the shards that will radiate outward from the middle. 
Tried integrating the flower into the main assessment js file but for some reason the flower graphic won't
draw in the middle of the jigsaw canvas. Changed how the flower will look. It will now go toward the middle from the top left.
Discarded the shards as it wouldn't look good with the new flower pattern. Working on a background.
Will leave tomorrow with the completed puzzle flower and bug fixing. If neccessary I will add colour to the current graphic
and hand that in.

References used:
https://p5js.org/reference/
https://www.w3schools.com/jsref/default.asp
https://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
https://www.openprocessing.org/sketch/520719
https://www.openprocessing.org/sketch/520720