ticTacToeApp
    .controller("BoardController", BoardController);

function BoardController() {
    //TODO(ryan): create win counter
    //TODO(ryan): disable gameBoard click after win
    //TODO(ryan): create 'start new game' button and accompanying logic

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

    var winner = null;

    //player one goes first
    var playerOneTurn = true;

    //track player wins
    var playerOneWinCount = 0;
    var playerTwoWinCount = 0;

    //show box content on click,
    //track which boxes have been clicked,
    //and check if either player has won after his or her last move
    this.playerMove = playerMove;
    function playerMove (location) {

        if (this.gameBoard[location].value === 0) {

            if (playerOneTurn) {
                // playerOne's turn
                this.gameBoard[location].content = 'x';
                this.gameBoard[location].value = 1;
                playerOneTurn = false;

                if (this.checkForWinner() === "playerOne") {
                    //end game in favor of playerOne
                    console.log(winner + " is the winner");
                } else if (this.checkForWinner() === "playerTwo"){
                    //end game in favor of player two
                    console.log(winner + " is the winner");
                }

            } else {

                //playerTwo's turn
                this.gameBoard[location].content = 'o';
                this.gameBoard[location].value = -1;
                playerOneTurn = true;

                //TODO(ryan):complete check for winner logic for playerTwo
                //if (this.checkForWinner() === "playerTwo") {
                //end game in favor of playerTwo
                //} else {
                // move along, nothing to see here...
                //}
            }
        } else {
            // this should run if you click on a square that has been played already
            console.log("this square has been played");
        }
    }

    this.checkForWinner = checkForWinner;
    function checkForWinner () {

        var gameBoard = this.gameBoard;

        function createThreeBoxArrays () {
            var threeBoxArray = [];

            //TODO(ryan): create function for column and row check
            //check the rows
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
            } //end of row check

            //check the columns
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
            } //end of column check

            //TODO(ryan): create function for diagonal check
            //check the diagonals
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
            } //end of diagonal check


        } //end of threeBoxArray()

        function checkThreeBoxArray (threeBoxArray) {
            var boxZero = threeBoxArray[0];
            var boxOne = threeBoxArray[1];
            var boxTwo = threeBoxArray[2];
            if ((boxZero + boxOne + boxTwo) === 3) {
                winner = "playerOne";
            } else if ((boxZero + boxOne + boxTwo) === -3) {
                winner = "playerTwo";
            }
        } //end of checkThreeBoxArray()

        createThreeBoxArrays();
        return winner;
    }

    this.startNewGame = startNewGame;
    function startNewGame () {
        document.location.reload(true);
    }
}