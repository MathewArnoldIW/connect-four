# BattlePets

# About
BattlePets is an interactive 2-player game to showcase InfiniPets as a company. It's based off the classic board game "Battleships", which players should be familiar with. It has a Cats vs. Dogs theme and aims to find an answer to the age -old question of "Which pet is better!?".

## Useful Links
 - Miro Board - https://miro.com/app/board/o9J_lRciNQM=/
 - Trello Board - https://trello.com/b/W3JztFEQ/battlepets
 - Google Drive - https://drive.google.com/drive/folders/1GI093q_-KtfhcfyAVzzNpFHC7KBFUuAk
 - React Info - https://www.freecodecamp.org/news/create-a-react-frontend-a-node-express-backend-and-connect-them-together-c5798926047c/


## Setup
When cloning repo run ```npm install```

## Active scripts
To run use ```npm start```
For development server use ```npm run dev```

## Relating 1D and 2D boards
How does storing a 2D battleship board in a 1D array work? 

Here's our 1D array:


We can imagine how this row of indexes would map to a 2D grid:


Bear in mind that this image is just a visual reference for us; the code sees our board like the 1D row above, not this 2D grid!

If we were happy to always deal with 1D indexes (which I'll just call **indexes** from here), then this would be good to go. If we want to know what's in the top-left corner, we just look at ```myBoard[8]``` and it'll work no problem. But sometimes, we want to deal in 2D coordinates (**coords** from here onwards).

Here's a board with **coords**. Again, this is just a visualization and doesn't exist in the code. We can see how each **coord** relates to an **index** by comparing the two grids above. [8] becomes (0,2) for example. Here's how we can do that conversion programmatically.

### Coords --> Indexes
Let's take (2,1) as an example, which should become [6]. How do we get there? In an (x, y) **coord**, the x represents movement to the right (+1 on our board) and y is movement up (+4 on our board, or to generalize, +boardWidth). Given this, the conversion is pretty straightforwards. Below is how we arrive at 6 for our specific example:
\n*index = (y * boardWidth) + x*
\n*index = (1 * 4) + 2*
\n*index = 6* 
