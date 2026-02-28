/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};
window.GameApp.UI.Screens = window.GameApp.UI.Screens || {};

window.GameApp.UI.Screens.Distribute = (function () {
    "use strict";

    function buildScreen2() {
        var currentTopicInfo = GameApp.State.currentTopicInfo;
        if (!currentTopicInfo) {
            console.log("Can't proceed - no topic set.");
            return;
        }

        // Save current players before distributing
        GameApp.UI.Players.updatePlayerListInState();
        var playerNames = GameApp.State.getPlayers();

        if (playerNames.length < 3) {
            alert("You need at least 3 players to play!");
            return;
        }

        GameApp.UI.Transitions.changeScreenTo('#screenDistributeTopic');

        //remove existing elems of show-list
        $('#playerListForShowTopic li').remove();
        $('#startButton').hide().removeClass('fade-enter').removeClass('fade-leave');

        // Distribute roles
        var gInfos = GameApp.Logic.distributeRoles(playerNames, currentTopicInfo);
        var fragment = document.createDocumentFragment();

        gInfos.forEach(function (info, i) {
            var labelText = info.playerName,
                inp = $("<a class='button large hollow expanded' data-open='showRoleModal'>" + labelText + "</a>"),
                li = $("<li class='role-reveal-item' style='--i: " + i + ";'>");
            inp.appendTo(li);
            inp.on('click', function () {
                // Ensure Modals is available
                if (GameApp.UI.Modals) {
                    GameApp.UI.Modals.showForPlayer($(this), info);
                } else if (GameApp.UI.showForPlayer) {
                    // Fallback to facade if needed
                    GameApp.UI.showForPlayer($(this), info);
                } else {
                    console.error("Modals module not loaded");
                }
            });
            fragment.appendChild(li[0]);
        });

        $('#playerListForShowTopic').append(fragment);
    }

    return {
        buildScreen2: buildScreen2
    };
})();
