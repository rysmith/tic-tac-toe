ticTacToeApp
    .controller("BoardController", BoardController);

BoardController.$inject = ["$firebaseObject"];

function BoardController($firebaseObject) {

    //firebase
    var self = this;
    var ref = new Firebase("https://glowing-torch-9844.firebaseio.com");
    self.game = $firebaseObject(ref.child("game"));
    
    //fires when a user clicks on the game board
    //sets and displays each player's game piece (gameBoard.content)
    //tracks where a game piece has been played (gameBoard.value)
    //increments moveCount
    //toggles playerOneTurn
    //checks if either player has won via checkForWinner()
    //increments player win count
    //self.playerMove = playerMove;
    self.playerMove = function playerMove(location) {

        //before allowing play, check for winner
        if (self.game.gameOver) {

            self.game.gameOverAlert = "The game is over, no play is allowed.  Start a new game.";
            self.game.$save();

        } else {

                //player can place a game piece if the box is empty
                if (self.game.gameBoard[location].value === 0) {

                    if (self.game.playerOneTurn) {

                        // playerOne's turn
                        self.game.gameBoard[location].content = 'fa fa-times';
                        self.game.gameBoard[location].value = 1;
                        self.game.playerOneTurn = false;
                        self.game.alreadyPlayedAlert = " ";
                        self.game.$save();

                    } else {

                        //playerTwo's turn
                        self.game.gameBoard[location].content = 'fa fa-circle-o';
                        self.game.gameBoard[location].value = -1;
                        self.game.playerOneTurn = true;
                        self.game.alreadyPlayedAlert = " ";
                        self.game.$save();

                    }

                    self.game.moveCount++;
                    self.game.$save();

                } else {

                    //run if you click on a box that has been played already
                    self.game.alreadyPlayedAlert = "This square has been played. Choose a different square.";
                    self.game.$save();

                }

            }
        if (self.game.gameOver === false) {
            //check for a winner
            if (self.game.winner === "Player One") {

                //end game in favor of playerOne
                self.game.gameOver = true;
                self.game.playerOneWinCount++;
                self.game.winner = " ";
                self.game.$save();

            } else if (self.game.winner === "Player Two") {

                //end game in favor of player two
                self.game.gameOver = true;
                self.game.playerTwoWinCount++;
                self.game.winner = " ";
                self.game.$save();

            }

        }
    } //end of playerMove()

    //Player One can win, Player Two can win, or it can be a tie
    //self.checkForWinner = checkForWinner;
    self.checkForWinner = function () {

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
                    for (var i = 0; i < 9; i++) {
                        if (self.game.gameBoard[i].row === j) {
                            //create row array
                            threeBoxArray.push(self.game.gameBoard[i].value);
                            console.log("row check: " + threeBoxArray);
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
                    for (var q = 0; q < 9; q++) {
                        if (self.game.gameBoard[q].column === p) {
                            //create column array
                            threeBoxArray.push(self.game.gameBoard[q].value);
                            console.log("column check: " + threeBoxArray);
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
                    for (var w = 0; w < 9; w++) {
                        if (self.game.gameBoard[w].diagonal === r || self.game.gameBoard[w].diagonal === 3) {
                            //create column array
                            threeBoxArray.push(self.game.gameBoard[w].value);
                            console.log("diagonal check: " + threeBoxArray);
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
                    self.game.winner = "Player One";
                    self.game.playerOneWinCount++
                    self.game.$save();
                } else if ((boxZero + boxOne + boxTwo) === -3) {
                    self.game.winner = "Player Two";
                    self.game.playerTwoWinCount++
                    self.game.$save();
                }
            } //end of checkThreeBoxArray()

        } //end of threeBoxArray()
        //check for a tie, otherwise check for a winner
        if (self.game.moveCount === 9 && self.game.winner === " ") {

            self.game.winner = "Nobody!  It's a cats game.";
            self.game.gameOver = true;
            self.game.$save();
            console.log(self.game.winner);
            return self.game.winner;


        }

        self.game.$save();
        console.log(self.game.winner);

        return self.game.winner;

    };

    //refresh the page
    self.startNewGame = startNewGame;
    function startNewGame() {
        //move through each gameboard object and reset content to " " and value to 0
        for (var i = 0; i < 9; i++) {
            self.game.gameBoard[i].content = " ";
            self.game.gameBoard[i].value = 0;
        }
        self.game.gameOver = false;
        self.game.gameOverAlert = " ";
        self.game.winner = " ";
        self.game.alreadyPlayedAlert = " ";
        self.game.moveCount = 0;
        self.game.playerOneTurn = true;
        self.game.$save();

    }

    //TESTING AREA
    //self.playerMove = playerMove;
    //function playerMove(location) {
    //
    //    self.gameBoard[location].content = 'fa fa-times';
    //    self.gameBoard[location].value = 1;
    //    self.gameBoard.$save();
    //    console.log(self.gameBoard);
    //
    //}
    //self.game.gameOver = "some different string";
    //self.game.$save();
    //console.log(self.game);
    ////self.gameBoard[0].value = "x";
    //self.gameBoard.$save();
    //console.log(self.gameBoard);

    //this will get the value of the gameOver key:value pair
    //self.gameOver = $firebaseObject(ref.child("game/gameOver"));
    //self.gameOver.$loaded().then(function(gameOver) {
    //    console.log(gameOver.$value);
    //});

    //self.gameOver = $firebaseObject(ref.child("game/gameOver"));
    //console.log(self.gameBoard);
    //console.log(self.gameOver);

    //self.game.$loaded().then(function(game) {
    //    console.log(game);
    //    self.gameBoard = game.gameBoard;
    //});
}
