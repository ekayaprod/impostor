/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};
window.GameApp.UI.Screens = window.GameApp.UI.Screens || {};

window.GameApp.UI.Screens.Distribute = (function () {
    "use strict";

    function buildScreen2() {
        // Save current players before distributing
        GameApp.UI.Players.updatePlayerListInState();
        var playerNames = GameApp.State.getPlayers();
        var currentTopicInfo = GameApp.State.currentTopicInfo;

        var errors = [];
        if (playerNames.length < 3) {
            errors.push("players");
        }
        if (!currentTopicInfo || !currentTopicInfo.topic || !currentTopicInfo.category) {
            errors.push("topic");
        }

        var $errorMsg = $('#setupErrorMsg');

        if (errors.length > 0) {
            var msg = "";
            if (errors.includes("players") && errors.includes("topic")) {
                msg = "We need at least 3 artists and a secret topic before we can start!";
            } else if (errors.includes("players")) {
                msg = "An art studio needs a crowd. Invite at least 3 artists to play!";
            } else {
                msg = "What are we painting? Please pick or set a secret topic first!";
            }

            $errorMsg.text(msg).addClass('is-visible');
            return;
        }

        $errorMsg.removeClass('is-visible');

        GameApp.UI.Transitions.changeScreenTo('#screenDistributeTopic');

        //remove existing elems of show-list
        $('#playerListForShowTopic li').remove();
        $('#startButton').hide();

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
