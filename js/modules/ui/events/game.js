/*global $, GameApp */
$(document).ready(function () {
    "use strict";

    $('#editGameButton').on('click', function() {
        GameApp.UI.changeScreenTo('#screenSetPlayers');
    });

    $('#distributeTopicButton').on('click', GameApp.UI.buildScreen2);

    $('#endAndRevealButton').on('click', GameApp.UI.revealImpostor);

    $('#startButton').on('click', GameApp.UI.buildScreen3);

});
