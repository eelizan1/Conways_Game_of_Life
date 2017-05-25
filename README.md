# Conways_Game_of_Life
My implementation of Conway's Game of Life using JavaScript and Bootstrap.
The "game" is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves, or, for advanced "players", by creating patterns with particular properties.

Rules:
1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

This application does:
- All 4 rules above
- Start, stop, clear, and reset the game
- Live counts the number of a live cells
- Does single placement, one generation, or random generation

More information here: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

Image of the application is in the in src repo
