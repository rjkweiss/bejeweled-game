const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe ('Bejeweled', function () {
  // let game;
  let grid;

  beforeEach(() => {
    // game = new Bejeweled();
    grid = Bejeweled.prototype.initializeGrid();
  });

  // Add tests for setting up a basic board
  context('it should set up the game board correctly', function() {
    it('should initialize a 8x8 board correctly', function() {
      // const grid = game.grid;
      expect(grid).to.have.lengthOf(8);
      expect(grid[0]).to.have.lengthOf(8);
    });

    it('should fill the board with given jewels', function() {
      // const grid = game.grid;
      const validGems = ['🥝', '🍓', '🥥', '🍇', '🍊', '🍋'];
      grid.forEach((row) => {
        row.forEach(gem => {
          expect(validGems).to.include(gem);
        });
      });
    });

    it('should ensure that there are no initial matches', function() {
      // const grid = game.grid;
      const hasMatch = Bejeweled.checkForMatches(grid);
      expect(hasMatch).to.be.empty;
;    });
  });


  // Add tests for a valid swap that matches 3
  context('it should find valid matches for swap', function() {
    it('should swap 3 matching horizontally', function() {

    });

    it('should swap 3 matches vertically', function() {

    });
  });

  // Add tests for swaps that set up combos
  context('it should test for swaps that set up combos', function() {});

  // Add tests to check if there are no possible valid moves
  context('it should check for no possible valid moves', function() {});

});
