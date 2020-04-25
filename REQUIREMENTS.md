# P0
- Allow player to solve the maze and notify if they solved it
- The player needs to register and logins to play
- There will be 3 types of account:
  - Admin: Have access to all features of the app
  - Primeum: Can play the game and have access to solution generator
  - Basic: Can play the game
- Player can use either mouse of keyboard to go through the maze
- Player can configure the game with the following properties:
  - Maze dimensions (limits TBD)
- Maze generator logic will be in the client side
- The app will allow the player to save the game (which will output a session id) and resume the game using the session id.
- The player can keep track of how long the game has started and how long it took to solve the game
- The player can retrieve their game history including:
  - Time spent on the game
  - The maze board
  - The steps the player has made
- The game has the undo feature to allow player undo whatever moves they make

# P1
- Maze generator logic will be in the server side
- Allow multiplayer to play the same maze