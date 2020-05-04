# P0
- Allow player to solve the maze and notify if they solved it
- The player needs to register and logins to play
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
- Each account will have a role associated with it. Each role will have access to certain features.
- Roles and features:
  - Roles:
    - Admin
    - Premium
    - Basic
    - Anonymous
  - Features:
    - Solution generator
    - Save & resume games
    - Markers that allow players to mark cells on the board so that it's easier to solve

# P1
- Maze generator logic will be in the server side
- Allow multiplayer to play the same maze

# P2
- Allow player to watch a game
- Allow player to text to each other during the game
- Allow player to have contacts list and to be able to add other player as friends
- Allow player to invite a friend to play