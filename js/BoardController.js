ticTacToeApp
    .controller("BoardController", BoardController);

function BoardController() {
    //TODO(ryan): create win counter
    //TODO(ryan): disable gameBoard click after win
    //TODO(ryan): startNewGame should preserve playerWinCount

    //an array containing 9 objects each representing a box on the game board
    this.gameBoard = [
        {
            location: 'topLeft',
            row: 1,
            column: 1,
            diagonal: 1,
            content: null,
            value: 0,
            class: "first-row first-col"
        },
        {
            location: 'topMiddle',
            row: 1,
            column: 2,
            diagonal: 0,
            content: null,
            value: 0,
            class: "first-row second-col"
        },
        {
            location: 'topRight',
            row: 1,
            column: 3,
            diagonal: 2,
            content: null,
            value: 0,
            class: "first-row third-col"
        },
        {
            location: 'centerLeft',
            row: 2, column: 1,
            diagonal: 0,
            content: null,
            value: 0,
            class: "second-row first-col"
        },
        {
            location: 'centerMiddle',
            row: 2,
            column: 2,
            diagonal: 3,
            content: null,
            value: 0,
            class: "second-row second-col"
        },
        {
            location: 'centerRight',
            row: 2,
            column: 3,
            diagonal: 0,
            content: null,
            value: 0,
            class: "second-row third-col"
        },
        {
            location: 'bottomLeft',
            row: 3,
            column: 1,
            diagonal: 2,
            content: null,
            value: 0,
            class: "third-row first-col"
        },
        {
            location: 'bottomMiddle',
            row: 3,
            column: 2,
            diagonal: 0,
            content: null,
            value: 0,
            class: "third-row second-col"
        },
        {
            location: 'bottomRight',
            row: 3,
            column: 3,
            diagonal: 1,
            content: null,
            value: 0,
            class: "third-row third-col"
        }
    ];
    //end of gameBoard array

    this.alreadyPlayedAlert = null;
    this.gameOverAlert = null;

    var winner = null;
    var gameOver = false;

    //player one goes first
    var playerOneTurn = true;
    var moveCount = 0;

    //track player wins
    this.playerOneWinCount = 0;
    this.playerTwoWinCount = 0;

    //fires when a user clicks on the game board
    //sets and displays each player's game piece (gameBoard.content)
    //tracks where a game piece has been played (gameBoard.value)
    //increments moveCount
    //toggles playerOneTurn
    //checks if either player has won via checkForWinner()
    //increments player win count
    this.playerMove = playerMove;
    function playerMove(location) {

        //before allowing play, check for winner
        if (gameOver) {

            this.gameOverAlert = "The game is over, no play is allowed.  Start a new game.";

        } else {
                //player can place a game piece if the box is empty
                if (this.gameBoard[location].value === 0) {

                    if (playerOneTurn) {

                        // playerOne's turn
                        this.gameBoard[location].content = 'fa fa-times';
                        this.gameBoard[location].value = 1;
                        playerOneTurn = false;
                        this.alreadyPlayedAlert = null;

                    } else {

                        //playerTwo's turn
                        this.gameBoard[location].content = 'fa fa-circle-o';
                        this.gameBoard[location].value = -1;
                        playerOneTurn = true;
                        this.alreadyPlayedAlert = null;

                    }

                    moveCount++;

                } else {

                    //run if you click on a box that has been played already
                    this.alreadyPlayedAlert = "This square has been played. Choose a different square.";

                }

            }
        if (gameOver === false) {
            //check for a winner
            if (this.checkForWinner() === "Player One") {

                //end game in favor of playerOne
                gameOver = true;
                this.playerOneWinCount++;
                winner = null;

            } else if (this.checkForWinner() === "Player Two") {

                //end game in favor of player two
                gameOver = true;
                this.playerTwoWinCount++;
                winner = null;

            }

        }
    }

    //Player One can win, Player Two can win, or it can be a tie
    this.checkForWinner = checkForWinner;
    function checkForWinner() {

        var gameBoard = this.gameBoard;

        //check for a tie, otherwise check for a winner
        if (moveCount === 9 && winner === null) {

            winner = "Nobody!  It's a cats game.";
            gameOver = true;
            return winner;

        } else {

            //checks all row, columns, and diagonals for a winner
            createThreeBoxArrays();
            function createThreeBoxArrays() {
                var threeBoxArray = [];

                createRowsAndCheck();
                createColumnsAndCheck();
                createDiagonalsAndCheck();

                //check the rows with checkThreeBoxArray()
                function createRowsAndCheck () {
                    for (var j = 1; j < 4; j++) {
                        for (var i = 0; i < gameBoard.length; i++) {
                            if (gameBoard[i].row === j) {
                                //create row array
                                threeBoxArray.push(gameBoard[i].value);
                                if (threeBoxArray.length === 3) {
                                    checkThreeBoxArray(threeBoxArray);
                                    threeBoxArray = [];
                                }

                            }
                        }
                    }
                } //end of row check

                //check the columns with checkThreeBoxArray()
                function createColumnsAndCheck () {
                    for (var p = 1; p < 4; p++) {
                        for (var q = 0; q < gameBoard.length; q++) {
                            if (gameBoard[q].column === p) {
                                //create column array
                                threeBoxArray.push(gameBoard[q].value);
                                if (threeBoxArray.length === 3) {
                                    checkThreeBoxArray(threeBoxArray);
                                    threeBoxArray = [];
                                }

                            }
                        }
                    }
                } //end of column check

                //check the diagonals with checkThreeBoxArray()
                function createDiagonalsAndCheck () {
                    for (var r = 1; r < 3; r++) {
                        for (var w = 0; w < gameBoard.length; w++) {
                            if (gameBoard[w].diagonal === r || gameBoard[w].diagonal === 3) {
                                //create column array
                                threeBoxArray.push(gameBoard[w].value);
                                if (threeBoxArray.length === 3) {
                                    checkThreeBoxArray(threeBoxArray);
                                    threeBoxArray = [];
                                }

                            }
                        }
                    }
                } //end of diagonal check

                //sets winner and increments either playerOneWinCount or playerTwoWinCount
                function checkThreeBoxArray(threeBoxArray) {
                    var boxZero = threeBoxArray[0];
                    var boxOne = threeBoxArray[1];
                    var boxTwo = threeBoxArray[2];
                    if ((boxZero + boxOne + boxTwo) === 3) {
                        winner = "Player One";
                    } else if ((boxZero + boxOne + boxTwo) === -3) {
                        winner = "Player Two";
                    }
                } //end of checkThreeBoxArray()

            } //end of threeBoxArray()

            return winner;
        }
    }

    //refresh the page
    this.startNewGame = startNewGame;
    function startNewGame() {
        //move through each gameboard object and reset content to null and value to 0
        for (var i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[i].content = null;
            this.gameBoard[i].value = 0;
        }
        gameOver = false;
        this.gameOverAlert = null;
        winner = null;
        this.alreadyPlayedAlert = null;
        moveCount = 0;
    }
}