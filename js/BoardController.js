ticTacToeApp
    .controller("BoardController", BoardController);

function BoardController() {

    // get the array of the tic-tac-toe board
    this.gameBoard = [
        {location: 'topLeft', content: null, value: null},
        {location: 'topMiddle', content: null, value: null},
        {location: 'topRight', content: null, value: null},
        {location: 'centerLeft', content: null, value: null},
        {location: 'centerMiddle', content: null, value: null},
        {location: 'centerRight', content: null, value: null},
        {location: 'bottomLeft', content: null, value: null},
        {location: 'bottomMiddle', content: null, value: null},
        {location: 'bottomRight', content: null, value: null}
    ];

    var winner;
    var playerOneTurn = true;

    //TODO(ryan): check if playerMove logic is working correctly
    this.playerMove = playerMove;
    function playerMove () {

        while (winner === false) {

            if (this.gameBoard.value === null) {

                if (playerOneTurn) {

                    // player one's turn
                    this.gameBoard.value = 1;
                    if (this.checkForWinner() === "playerOne") {
                        console.log(this.checkForWinner());

                    } else {

                        playerOneTurn = false;
                    }

                } else {

                    //player two's turn
                    this.gameBoard.value = -1;

                    if (this.checkForWinner() === "player2") {

                        console.log(this.checkForWinner());

                    } else {

                        playerOneTurn = true;
                    }
                }
            } else {
                // this should run if you click on a square that has been played already
                console.log("this square has been played");
            }
        }
    }


    //TODO(ryan): write business logic to check if there is a winner
    this.checkForWinner = checkForWinner;
    function checkForWinner () {
        // check if there is a winner

        return winner;
    }

}



