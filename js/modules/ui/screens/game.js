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

        var fragment = document.createDocumentFragment();
        GameApp.State.getPlayers().forEach(function(name, i) {
            var li = document.createElement('li');
            li.textContent = name;
            li.className = 'game-player-item';
            li.style.setProperty('--i', i);
            fragment.appendChild(li);
        });

        list.append(fragment);
    }

    return {
        buildScreen3: buildScreen3
    };
})();
