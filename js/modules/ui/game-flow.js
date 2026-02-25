/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.GameFlow = (function () {
    "use strict";

    function updateCategoryDisplay() {
        var info = GameApp.State.currentTopicInfo;
        $('#categoryDisplay').html(info ? info.category : "No category selected");

        // Use PlayerManager to get player count
        var count = GameApp.UI.PlayerManager ? GameApp.UI.PlayerManager.numPlayers() : 0;

        if (count > 2 && info && info.topic && info.category) {
            $('#distributeTopicButton').show();
        } else {
            $('#distributeTopicButton').hide();
        }
    }

    function buildScreen1() {
        GameApp.UI.ScreenManager.changeScreenTo('#screenSetPlayers');
        $('#playerList .playerListItem').remove();
        var playerNames = GameApp.State.getPlayers();

        playerNames.forEach(function (n) {
            GameApp.UI.PlayerManager.addPlayer({
                name: n,
                animate: false
            });
        });

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
        if (GameApp.UI.PlayerManager) {
             GameApp.UI.PlayerManager.updatePlayerListInState();
        }

        var playerNames = GameApp.State.getPlayers();

        if (playerNames.length < 3) {
            alert("You need at least 3 players to play!");
            return;
        }

        GameApp.UI.ScreenManager.changeScreenTo('#screenDistributeTopic');

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
                showForPlayer($(this), info);
            });
            fragment.appendChild(li[0]);
        });

        $('#playerListForShowTopic').append(fragment);
    }

    function buildScreen3() {
        GameApp.UI.ScreenManager.changeScreenTo('#screenGameInProgress');

        // Populate the game in progress list (optional, but nice)
        var list = $('#playerListForGameInProgress');
        list.empty();
        GameApp.State.getPlayers().forEach(function(name) {
            list.append('<li>' + name + '</li>');
        });
    }

    function showForPlayer(obj, info) {
        if (info.isImpostor) {
            $('#showRoleModal .topicDisplay').html("You are the Impostor.");
            $('#showRoleModal .topicDisplayLabel').hide();
        } else {
            $('#showRoleModal .topicDisplay').html(info.topic);
            $('#showRoleModal .topicDisplayLabel').show();
        }
        $('#showRoleModal .nameDisplay').html(info.playerName);
        $('#showRoleModal .categoryDisplay').html(info.category);

        obj.closest("li").remove();
        var remainingPlayerCount = $('#playerListForShowTopic li').length;
        if (remainingPlayerCount < 1) {
            $('#startButton').show();
        }
    }

    function revealImpostor() {
        var impostorNames = GameApp.Logic.getImpostorNames();
        $('#revealModal .impostorName').html(impostorNames);
        $('#revealModal .topic').html(GameApp.State.currentTopicInfo ? GameApp.State.currentTopicInfo.topic : "");
    }

    return {
        buildScreen1: buildScreen1,
        buildScreen2: buildScreen2,
        buildScreen3: buildScreen3,
        updateCategoryDisplay: updateCategoryDisplay,
        revealImpostor: revealImpostor
    };
})();
