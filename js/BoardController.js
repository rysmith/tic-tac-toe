ticTacToeApp
    .controller("BoardController", BoardController);

BoardController.$inject = ["$firebaseArray", "$firebaseObject"];

function BoardController($firebaseArray, $firebaseObject) {


    //firebase
    var self = this;
    var ref = new Firebase("https://glowing-torch-9844.firebaseio.com");
    self.gameBoard = $firebaseArray(ref.child("game/gameBoard"));
    self.gameOver = $firebaseObject(ref.child("game/gameOver"));
    self.alreadyPlayedAlert = $firebaseObject(ref.child("game/alreadyPlayedAlert"));
    self.gameOverAlert = $firebaseObject(ref.child("game/gameOverAlert"));
    self.moveCount = $firebaseObject(ref.child("game/moveCount"));
    self.playerOneTurn = $firebaseObject(ref.child("game/playerOneTurn"));
    self.playerOneWinCount = $firebaseObject(ref.child("game/playerOneWinCount"));
    self.playerTwoWinCount = $firebaseObject(ref.child("game/playerTwoWinCount"));
    self.winner = $firebaseObject(ref.child("game/winner"));

    console.log(self.gameBoard);

    self.gameBoard.$loaded().then(function(gameBoard) {
        console.log(gameBoard.length);
    });


    //fires when a user clicks on the game board
    //sets and displays each player's game piece (gameBoard.content)
    //tracks where a game piece has been played (gameBoard.value)
    //increments moveCount
    //toggles playerOneTurn
    //checks if either player has won via checkForWinner()
    //increments player win count
    self.playerMove = playerMove;
    function playerMove(location) {

        //before allowing play, check for winner
        if (self.gameOver.$value) {

            self.gameOverAlert.$value = "The game is over, no play is allowed.  Start a new game.";

        } else {

                //player can place a game piece if the box is empty
                if (self.gameBoard[location].value === 0) {

                    if (self.playerOneTurn) {

                        // playerOne's turn
                        self.gameBoard[location].content = 'fa fa-times';
                        self.gameBoard[location].value = 1;
                        self.playerOneTurn = false;
                        self.alreadyPlayedAlert.$value = " ";
                        debugger;


                    } else {

                        //playerTwo's turn
                        self.gameBoard[location].content = 'fa fa-circle-o';
                        self.gameBoard[location].value = -1;
                        self.playerOneTurn = true;
                        self.alreadyPlayedAlert.$value = " ";
                        debugger;

                    }

                    self.moveCount.$value++;

                } else {

                    //run if you click on a box that has been played already
                    self.alreadyPlayedAlert.$value = "This square has been played. Choose a different square.";
                    debugger;
                }

            }
    //    if (self.gameOver.$value === false) {
    //        //check for a winner
    //        if (self.checkForWinner() === "Player One") {
    //
    //            //end game in favor of playerOne
    //            self.gameOver.$value = true;
    //            self.playerOneWinCount.$value++;
    //            winner = " ";
    //            debugger;
    //
    //        } else if (self.checkForWinner() === "Player Two") {
    //
    //            //end game in favor of player two
    //            self.gameOver.$value = true;
    //            self.playerTwoWinCount.$value++;
    //            self.winner.$value = " ";
    //            debugger;
    //
    //        }
    //    debugger;
    //    }
    } //end of playerMove()
    //
    ////Player One can win, Player Two can win, or it can be a tie
    //this.checkForWinner = checkForWinner;
    //function checkForWinner() {
    //
    //    //check for a tie, otherwise check for a winner
    //    if (self.moveCount.$value === 9 && self.winner.$value === " ") {
    //
    //        self.winner.$value = "Nobody!  It's a cats game.";
    //        self.gameOver.$value = true;
    //        return self.winner.$value;
    //
    //    } else {
    //
    //        //checks all row, columns, and diagonals for a winner
    //        createThreeBoxArrays();
    //        function createThreeBoxArrays() {
    //            var threeBoxArray = [];
    //
    //            createRowsAndCheck();
    //            createColumnsAndCheck();
    //            createDiagonalsAndCheck();
    //
    //            //check the rows with checkThreeBoxArray()
    //            function createRowsAndCheck () {
    //                for (var j = 1; j < 4; j++) {
    //                    for (var i = 0; i < self.gameBoard.length; i++) {
    //                        if (self.gameBoard[i].row === j) {
    //                            //create row array
    //                            threeBoxArray.push(gameBoard[i].value);
    //                            if (threeBoxArray.length === 3) {
    //                                checkThreeBoxArray(threeBoxArray);
    //                                threeBoxArray = [];
    //                            }
    //
    //                        }
    //                    }
    //                }
    //            } //end of row check
    //
    //            //check the columns with checkThreeBoxArray()
    //            function createColumnsAndCheck () {
    //                for (var p = 1; p < 4; p++) {
    //                    for (var q = 0; q < gameBoard.length; q++) {
    //                        if (gameBoard[q].column === p) {
    //                            //create column array
    //                            threeBoxArray.push(gameBoard[q].value);
    //                            if (threeBoxArray.length === 3) {
    //                                checkThreeBoxArray(threeBoxArray);
    //                                threeBoxArray = [];
    //                            }
    //
    //                        }
    //                    }
    //                }
    //            } //end of column check
    //
    //            //check the diagonals with checkThreeBoxArray()
    //            function createDiagonalsAndCheck () {
    //                for (var r = 1; r < 3; r++) {
    //                    for (var w = 0; w < gameBoard.length; w++) {
    //                        if (gameBoard[w].diagonal === r || gameBoard[w].diagonal === 3) {
    //                            //create column array
    //                            threeBoxArray.push(gameBoard[w].value);
    //                            if (threeBoxArray.length === 3) {
    //                                checkThreeBoxArray(threeBoxArray);
    //                                threeBoxArray = [];
    //                            }
    //
    //                        }
    //                    }
    //                }
    //            } //end of diagonal check
    //
    //            //sets winner and increments either playerOneWinCount or playerTwoWinCount
    //            function checkThreeBoxArray(threeBoxArray) {
    //                var boxZero = threeBoxArray[0];
    //                var boxOne = threeBoxArray[1];
    //                var boxTwo = threeBoxArray[2];
    //                if ((boxZero + boxOne + boxTwo) === 3) {
    //                    winner = "Player One";
    //                } else if ((boxZero + boxOne + boxTwo) === -3) {
    //                    winner = "Player Two";
    //                }
    //            } //end of checkThreeBoxArray()
    //
    //        } //end of threeBoxArray()
    //
    //        return winner;
    //    }
    //}

    ////refresh the page
    //this.startNewGame = startNewGame;
    //function startNewGame() {
    //    //move through each gameboard object and reset content to null and value to 0
    //    for (var i = 0; i < this.gameBoard.length; i++) {
    //        this.gameBoard[i].content = null;
    //        this.gameBoard[i].value = " ";
    //    }
    //    gameOver = false;
    //    this.gameOverAlert = null;
    //    winner = null;
    //    this.alreadyPlayedAlert = null;
    //    moveCount = 0;
    //    //TODO(ryan): make sure to save this with self.gameBoard.$save();

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
}
