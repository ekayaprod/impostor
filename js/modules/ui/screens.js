/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Screens = (function () {
    "use strict";

    function updateCategoryDisplay() {
        var info = GameApp.State.currentTopicInfo;
        $('#categoryDisplay').html(info ? info.category : "No category selected");

        // Need numPlayers from Players module
        var num = GameApp.UI.Players ? GameApp.UI.Players.numPlayers() : $('#playerList li').length;

        if (num > 2 && info && info.topic && info.category) {
            $('#distributeTopicButton').show();
        } else {
            $('#distributeTopicButton').hide();
        }
    }

    function buildScreen1() {
        GameApp.UI.Transitions.changeScreenTo('#screenSetPlayers');
        $('#playerList .playerListItem').remove();
        var playerNames = GameApp.State.getPlayers();

        var fragment = document.createDocumentFragment();

        playerNames.forEach(function (n, i) {
            var $el = GameApp.UI.Players.createPlayerElement(n, false);
            $el.addClass('player-list-load-item');
            $el.css('--i', i);
            fragment.appendChild($el[0]);
        });

        $('#playerList').append(fragment);

        $('#distributeTopicButton').hide();
        GameApp.State.gInfos = [];
        GameApp.State.currentTopicInfo = null;
        updateCategoryDisplay();
    }

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
        updateCategoryDisplay: updateCategoryDisplay,
        buildScreen1: buildScreen1,
        buildScreen2: buildScreen2,
        buildScreen3: buildScreen3
    };
})();
