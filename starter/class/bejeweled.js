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

  swapGems(grid, row1, col1, row2, col2) {
    let temp = grid[row1][col1];
    grid[row1][col2] = grid[row2][col2];
    grid[row2][col2] = temp;

    // check for matches after swap
    const matches = Bejeweled.checkForMatches(grid);

    if (matches.length > 0) {
      Screen.render();
      return matches;
    }

    // if no matches, swap back
    grid[row2][col2] = grid[row1][col1];
    grid[row1][col1] = temp;

    Screen.render();

    return [];
  }

  hasValidMoves(grid) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        // check right for potential swaps
        if (col < grid[0].length - 1) {
          const temp = grid[row][col];
          grid[row][col] = grid[row][col + 1];
          grid[row][col + 1] = temp;

          // check for matches
          if (Bejeweled.checkForMatches(grid).length > 0) {
            return true
          }

          // we haven't found any matches, so we swap back
          grid[row][col + 1] = grid[row][col];
          grid[row][col] = temp;
        }

        // check down for potential swaps
        if (row < grid.length - 1) {
          const temp = grid[row][col];
          grid[row][col] = grid[row + 1][col];
          grid[row + 1][col] = temp;

          if (Bejeweled.checkForMatches(grid).length > 0) {
            return true;
          }

          // otherwise swap back if no swaps were found
          grid[row + 1][col] = grid[row][col];
          grid[row][col] = temp;
        }
      }
    }
    return false;
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
