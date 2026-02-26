/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Modals = (function () {
    "use strict";

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
        showForPlayer: showForPlayer,
        revealImpostor: revealImpostor
    };
})();
