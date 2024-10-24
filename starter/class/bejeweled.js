const Screen = require("./screen");
const Cursor = require("./cursor");

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = this.initializeGrid(['🥝', '🍓', '🥥', '🍇', '🍊', '🍋']);

    // this.validGems = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    this.initializeCommands();
    this.updateGrid();

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  initializeCommands() {
    Screen.addCommand('up', 'Move Up', () => {this.cursor.up(); this.updateGrid()});
    Screen.addCommand('down', 'Move Down', () => {this.cursor.down(); this.updateGrid()});
    Screen.addCommand('left', 'Move Left', () => {this.cursor.left(); this.updateGrid()});
    Screen.addCommand('right', 'Move Right', () => {this.cursor.right(); this.updateGrid()});
    Screen.addCommand('u', 'Swap Up', () => {
      const {row, col} = this.cursor;
      const nextPos = {row: row - 1, col};
      this.swapAndCheck(this.cursor, nextPos);
    });
    Screen.addCommand('d', 'Swap Down', () => {
      const {row, col} = this.cursor;
      const nextPos = {row: row + 1, col};
      this.swapAndCheck(this.cursor, nextPos);
    });
    Screen.addCommand('l', 'Swap Left', () => {
      const {row, col} = this.cursor;
      const nextPos = {row, col: col - 1};
      this.swapAndCheck(this.cursor, nextPos);
    });
    Screen.addCommand('r', 'Swap Right', () => {
      const {row, col} = this.cursor;
      const nextPos = {row, col: col + 1};
      this.swapAndCheck(this.cursor, nextPos);
    });
  }

 updateGrid() {
    Screen.grid = this.grid.map(row => row.map(gem => gem));
    Screen.render();
  }

  swapAndCheck(pos1, pos2) {
    // only swap if next position is valid
    if (pos2.row >= 0 && pos2.row < this.grid.length && pos2.col >= 0 && pos2.col < this.grid[0].length) {
      this.swapGems(this.grid, pos1.row, pos1.col, pos2.row, pos2.col);

      // check for matches
      const matches = Bejeweled.checkForMatches(this.grid);

      if (matches.length) {
        console.log(`${this.playerTurn} made a move!`);

        // remove any matches when a match has been made
        this.removeInitialMatches(this.grid, ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋']);

        // update the grid
        this.updateGrid();
      } else {
        console.log(`${this.playerTurn} has found no matches! Swap players please!`);
        // undo any swaps done by previous player
        this.swapGems(this.grid, pos1.row, pos1.col, pos2.row, pos2.col);
        // switch players
        this.playerTurn = this.playerTurn === 'O' ? 'X': 'O';
      }
    } else {
      console.log('invalid swap positions!');
    }
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
