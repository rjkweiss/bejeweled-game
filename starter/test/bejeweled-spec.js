const { expect } = require('chai');

const Bejeweled = require("../class/bejeweled.js");

describe ('Bejeweled', function () {

  // Add tests for setting up a basic board
  context('it should set up the game board correctly', function() {
    let grid;

    beforeEach(() => {
      grid = Bejeweled.prototype.initializeGrid(['🥝', '🍓', '🥥', '🍇', '🍊', '🍋']);
    });

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
    // let grid;
    // beforeEach(() => {
    //   grid = Bejeweled.prototype.initializeGrid(['🥝', '🥝', '🥥', '🍇', '🍊', '🍋']);
    // });

    it('should swap 3 matching horizontally', function() {
      grid = [['🥝', '🥝', '🥝', '🥥', '🍊', '🍋'],
              ['🍇', '🥝', '🍊', '🍇', '🥥', '🍊'],
              ['🥥', '🍇', '🥥', '🍋', '🍊', '🍋'],
              ['🥝', '🥝', '🍊', '🍇', '🍊', '🍊']];
      const matches = Bejeweled.checkForMatches(grid);
      expect(matches).to.deep.equal([[0, 0], [0, 1], [0, 2]]);
    });

    it('should swap 3 matches vertically', function() {
      grid = [['🍇', '🥝', '🥝', '🥥', '🍊', '🍋'],
              ['🍇', '🍊', '🍊', '🍇', '🥥', '🍊'],
              ['🍇', '🍇', '🥥', '🍋', '🍊', '🍋'],
              ['🥝', '🥝', '🍊', '🍇', '🍊', '🍊']];
      const matches = Bejeweled.checkForMatches(grid);
      expect(matches).to.deep.equal([[0, 0], [1, 0], [2, 0]]);
    });

  });

  context('it should create a new match after a valid swap', function() {
    grid = [['🥝', '🥝', '🍊', '🍊', '🍊', '🍋', '🍇', '🥥'],
            ['🍊', '🍇', '🍊', '🍋', '🍇', '🍋', '🍊', '🥥']];
    Bejeweled.prototype.swapGems(grid, 0, 2, 0, 3);
    const matches = Bejeweled.checkForMatches(grid);
    expect(matches).to.not.be.empty;
  });

  // Add tests to check if there are no possible valid moves
  context('it should check for no possible valid moves', function() {
    grid = [['🥝', '🍋', '🥝', '🍊', '🥥', '🍋', '🍇', '🍋'],
            ['🍊', '🍇', '🥥', '🍋', '🥝', '🍊', '🥝', '🍇']];
    expect(Bejeweled.prototype.hasValidMoves(grid)).to.be.false;
  });


});
