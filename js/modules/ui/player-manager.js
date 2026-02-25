/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.PlayerManager = (function () {
    "use strict";

    function numPlayers() {
        return $('#playerList li').length;
    }

    function addPlayer(opts) {
        opts = opts || {};
        var n = opts.name || ("Player" + (numPlayers() + 1));
        if (typeof n !== 'string' || n.trim().length === 0) {
            n = "Player" + (numPlayers() + 1);
        }

        var cloned = $('#playerLiToClone').clone(),
            inp;

        cloned.removeAttr("id");
        cloned.removeAttr("style");
        cloned.addClass('playerListItem');

        if (opts.animate) {
            cloned.addClass('player-enter');
        }

        cloned.appendTo('#playerList');
        inp = cloned.find(".playerNameInput");
        inp.val(n);

        if (opts.focus) {
            inp.focus();
            inp.select();
        }

        updatePlayerListInState();
    }

    function deletePlayer(obj) {
        var li = $(obj).closest(".playerListItem");
        li.addClass('player-leave');

        setTimeout(function() {
            li.remove();
            updatePlayerListInState();
        }, 300);
    }

    function updatePlayerListInState() {
        var names = $('#playerList .playerNameInput').map(function () {
            return this.value;
        }).get();
        GameApp.State.savePlayers(names);

        // Notify GameFlow to update UI based on new player count
        if (GameApp.UI.GameFlow && GameApp.UI.GameFlow.updateCategoryDisplay) {
            GameApp.UI.GameFlow.updateCategoryDisplay();
        }
    }

    return {
        addPlayer: addPlayer,
        deletePlayer: deletePlayer,
        numPlayers: numPlayers,
        updatePlayerListInState: updatePlayerListInState
    };
})();
