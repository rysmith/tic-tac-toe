ticTacToeApp
    .controller("BoardController", BoardController);

BoardController.$inject = ["$firebaseObject"];

function BoardController($firebaseObject) {

    //tie 'this' to BoardController
    var self = this;

    //local variables for alerts and player identification
    var player = null;
    self.playerAlert = null;
    self.gameAlert = null;

    //Firebase hookup
    var ref = new Firebase("https://glowing-torch-9844.firebaseio.com");
    self.game = $firebaseObject(ref.child("game"));

    //sets gameBoard.content, gameBoard.value, moveCount, playerOneTurn, playerWinCount
    self.playerMove = function playerMove(location) {

        //before allowing play, check the status of the game
        if (self.game.gameOver) {

            self.playerAlert = "Please start a new game.";
            self.gameAlert = true;
            self.game.$save();

            //if the game is not over, then allow a player to make a move
        } else {

                //player can place a game piece if the box is empty
                if (self.game.gameBoard[location].value === 0) {

                    //make sure it's playerOne's turn before allowing play
                    if (self.game.playerOneTurn && player === 0) {

                        // playerOne's turn && reset gameAlert
                        self.game.gameBoard[location].content = 'fa fa-times';
                        self.game.gameBoard[location].value = 1;
                        self.game.playerOneTurn = false;
                        self.game.moveCount++;
                        self.gameAlert = false;
                        self.playerAlert = null;
                        self.game.$save();

                    //make sure it's playerTwo's turn before allowing play
                    } else if (self.game.playerOneTurn === false && player === 1) {

                        //playerTwo's turn && reset gameAlert
                        self.game.gameBoard[location].content = 'fa fa-circle-o';
                        self.game.gameBoard[location].value = -1;
                        self.game.playerOneTurn = true;
                        self.game.moveCount++;
                        self.gameAlert = false;
                        self.playerAlert = null;
                        self.game.$save();

                    }

                    //check for a tie, otherwise check for a winner
                    if (self.game.moveCount === 9 && self.game.winner === " ") {

                        self.game.winner = "Nobody!  It's a cats game.";
                        self.game.gameOver = true;
                        self.game.$save();
                        return self.game.winner;

                    }

                } else {

                    //alert if the box  has been played already
                    self.playerAlert = "Please choose a different square.";
                    self.gameAlert = true;
                    self.game.$save();

                }

            }

        //check winner and increment playerWinCount
        if (self.game.gameOver === false) {

            if (self.checkForWinner() === "Player One") {

                //end game in favor of playerOne
                self.game.gameOver = true;
                self.game.playerOneWinCount++;
                self.game.moveCount = 0;
                self.game.winner = " ";
                self.game.$save();

            } else if (self.checkForWinner() === "Player Two") {

                //end game in favor of player two
                self.game.gameOver = true;
                self.game.playerTwoWinCount++;
                self.game.moveCount = 0;
                self.game.winner = " ";
                self.game.$save();

            }
        }

        }; //end of playerMove

    //playerOne can win, playerTwo can win, or it can be a tie (cats) game
    self.checkForWinner = function () {

        //checks all row, columns, and diagonals for a winner
        createThreeBoxArrays();
        function createThreeBoxArrays() {
            var threeBoxArray = [];
            var boardInfo = [
              {
                numChecks: 3,
                field: "row"
              },
              {
                numChecks: 3,
                field: "column"
              },
              {
                numChecks: 2,
                field: "row",
                extraCheckAmount: 3
              },
            ];

            var field;
            var numChecks;

            // loops over each possible victory type
            for(var i = 0; i < boardInfo.length; i++){
                field = boardInfo[i]["field"];
                numChecks = boardInfo[i]["numChecks"] + 1;
                extraCheckAmount = boardInfo[i]["extraCheckAmount"];
                // loops over the possible victory types of this field
                for (var checkIndex = 1; checkIndex < numChecks; checkIndex++) {
                    // loops over all the squares on the board
                    for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
                        // extra check amount is an optional field and should be ignored if its not provided
                        if (self.game.gameBoard[boxIndex][field] === checkIndex || (extraCheckAmount && self.game.gameBoard[boxIndex][field] === extraCheckAmount)) {
                            threeBoxArray.push(self.game.gameBoard[boxIndex].value);
                            if (threeBoxArray.length === 3) {
                                checkThreeBoxArray(threeBoxArray);
                                threeBoxArray = [];
                            }
                        }
                    }
                }
            }

            //sets winner and increments either playerOneWinCount or playerTwoWinCount
            function checkThreeBoxArray(threeBoxArray) {
                var sum = 0;
                for(var i = 0; i <= 2; i++){
                  sum += threeBoxArray[i];
                }
                if (sum === 3 || sum === -3) {
                    self.game.winner = sum == 3 ? "Player One" : "Player Two";
                    self.game.gameOver = true;
                    self.game.$save();
                }
            } //end of checkThreeBoxArray()

        } //end of threeBoxArray()

        //save winner to firebase
        self.game.$save();

        return self.game.winner;

    }; //end of checkForWinner

    //reset everything except playerWinCount
    self.startNewGame = startNewGame;
    function startNewGame() {
        //move through each gameboard object and reset content to " " and value to 0
        for (var i = 0; i < 9; i++) {
            self.game.gameBoard[i].content = " ";
            self.game.gameBoard[i].value = 0;
        }
        self.game.gameOver = false;
        self.game.winner = " ";
        self.gameAlert = false;
        self.playerAlert = null;
        self.game.moveCount = 0;
        self.game.playerOneTurn = true;
        self.game.$save();

    } //end of startNewGame

    //only reset wins, no other resets
    self.clearAllWins = clearAllWins;
    function clearAllWins () {
        self.game.playerOneWinCount = 0;
        self.game.playerTwoWinCount = 0;
        self.game.$save();
    }//end of clearAllWins

    //prevent players from clicking when it's not their turn
    //this runs immediately, so we need to wait for the data before running
    self.game.$loaded().then(function () {

        //set playerOne
        if (self.game.playerCheck === 0) {
            player = 0;
            self.game.playerCheck = 1;
            self.game.$save();
            self.playerAlert = "Welcome, you are Player One.  You go first.";
            self.gameAlert = true;

          //sent playerTwo
        } else if (self.game.playerCheck === 1) {
            player = 1;
            self.game.playerCheck = 0;
            self.game.$save();
            self.playerAlert = "Welcome, you are Player Two.  You go second.";
            self.gameAlert = true;
        }

    });

}

