const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = this.initializeGrid(['🥝', '🍓', '🥥', '🍇', '🍊', '🍋']);

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);
    // this.initializeGrid();

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  initializeGrid(validGems) {

    let grid = Array.from({ length: 8 }, () =>
      Array.from({ length: 8 }, () =>
        validGems[Math.floor(Math.random() * validGems.length)]
      )
    );

    // ensure that there are no initial matches
    this.removeInitialMatches(grid, validGems);

    // Screen.render();
    return grid;

  }

  removeInitialMatches(grid, validGems) {
    let hasMatches = true;

    while(hasMatches) {
      hasMatches = false;

      const matches = Bejeweled.checkForMatches(grid);

      if (matches.length > 0) {
        hasMatches = true;

        matches.forEach(([row, col]) => {

          let newGem = grid[row][col];

          while (newGem === grid[row][col]) {
            newGem = validGems[Math.floor(Math.random() * validGems.length)];
          }
          grid[row][col] = newGem;
        });
      }
    }
  }

  swapGems(row1, col1, row2, col2) {
    let temp = this.grid[row1][col1];
    this.grid[row1][col2] = this.grid[row2][col2];
    this.grid[row2][col2] = temp;

    // check for matches after swap
    const matches = Bejeweled.checkForMatches(this.grid);

    if (matches.length > 0) {
      Screen.render();
      return matches;
    }

    // if no matches, swap back
    this.grid[row2][col2] = this.grid[row1][col1];
    this.grid[row1][col1] = temp;

    Screen.render();

    return [];
  }

  static checkForMatches(grid) {

    const matches = [];

    // check horizontal  matches
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length - 2; col++) {
        if(grid[row][col] === grid[row][col + 1] && grid[row][col] === grid[row][col + 2]) {
          matches.push([row, col], [row, col + 1], [row, col + 2]);
        }
      }
    }

    // check vertical matches
    for (let col = 0; col < grid[0].length; col++){
      for (let row = 0; row < grid.length - 2; row++) {
        if(grid[row][col] === grid[row + 1][col] && grid[row][col] === grid[row + 2][col]) {
          matches.push([row, col], [row + 1, col], [row + 2, col]);
        }
      }
    }

    return matches;
  }

}



module.exports = Bejeweled;
