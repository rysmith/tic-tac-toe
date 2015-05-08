(function () {
    "use strict";

    ticTacToeApp.controller("BoardController", BoardController);

    function BoardController() {

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
    }

})();

