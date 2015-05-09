ticTacToeApp
    .controller("BoardController", BoardController);

function BoardController() {

    // get the array of the tic-tac-toe board
    this.gameBoard = [
        {location: 'topLeft', row: 1, column: 1, content: null, value: 1, class: "first-row first-col"},
        {location: 'topMiddle', row: 1, column: 2, content: null, value: 1,  class: "first-row second-col"},
        {location: 'topRight', row: 1, column: 3, content: null, value: 0,  class: "first-row third-col"},
        {location: 'centerLeft', row: 2, column: 1, content: null, value: 0,  class: "second-row first-col"},
        {location: 'centerMiddle', row: 2, column: 2,  content: null, value: 0,  class: "second-row second-col"},
        {location: 'centerRight', row: 2, column: 3,  content: null, value: 0,  class: "second-row third-col"},
        {location: 'bottomLeft', row: 3, column: 1,  content: null, value: 0,  class: "third-row first-col"},
        {location: 'bottomMiddle', row: 3, column: 2,  content: null, value: 0,  class: "third-row second-col"},
        {location: 'bottomRight', row: 3, column: 3,  content: null, value: 0,  class: "third-row third-col"}
    ];

    var winner = null;
    var playerOneTurn = true;

    this.playerMove = playerMove;
    function playerMove (location) {

        if (this.gameBoard[location].value === 0) {

            if (playerOneTurn) {
                // playerOne's turn
                this.gameBoard[location].content = 'x';
                this.gameBoard[location].value = 1;
                playerOneTurn = false;

                //TODO(ryan):complete check for winner logic for playerOne
                //if (this.checkForWinner() === "playerOne") {
                //end game in favor of playerOne
                //} else {
                // move along, nothing to see here...
                //}

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


    //TODO(ryan): write logic to check if there is a winner
    this.checkForWinner = checkForWinner;
    function checkForWinner () {
        for (var i = 0; i < this.gameBoard.length; i++) {
            this.gameBoard[i].value

        }
        //should return 'playerOne', 'playerTwo', or 'null'
        //return winner;
    }

}