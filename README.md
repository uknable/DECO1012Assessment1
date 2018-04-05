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

References used:
https://p5js.org/reference/
https://www.w3schools.com/jsref/default.asp
https://stackoverflow.com/questions/4025893/how-to-check-identical-array-in-most-efficient-way
