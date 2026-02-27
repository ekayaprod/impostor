/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};
window.GameApp.UI.Screens = window.GameApp.UI.Screens || {};

window.GameApp.UI.Screens.Game = (function () {
    "use strict";

    function buildScreen3() {
        GameApp.UI.Transitions.changeScreenTo('#screenGameInProgress');

        // Populate the game in progress list
        var list = $('#playerListForGameInProgress');
        list.empty();
        GameApp.State.getPlayers().forEach(function(name) {
            list.append('<li>' + name + '</li>');
        });
    }

    return {
        buildScreen3: buildScreen3
    };
})();
