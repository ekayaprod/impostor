/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Players = (function () {
    "use strict";

    function numPlayers() {
        return $('#playerList li').length;
    }

    function createPlayerElement(name, animate) {
        var cloned = $('#playerLiToClone').clone();
        var inp;

        cloned.removeAttr("id");
        cloned.removeAttr("style");
        cloned.addClass('playerListItem');

        if (animate) {
            cloned.addClass('player-enter');
        }

        inp = cloned.find(".playerNameInput");
        inp.val(name);

        return cloned;
    }

    function addPlayer(opts) {
        opts = opts || {};
        var n = opts.name || ("Player" + (numPlayers() + 1));
        if (typeof n !== 'string' || n.trim().length === 0) {
            n = "Player" + (numPlayers() + 1);
        }

        var $el = createPlayerElement(n, opts.animate);
        $el.appendTo('#playerList');

        if (opts.focus) {
            $el.find(".playerNameInput").focus().select();
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

        if (GameApp.State && GameApp.State.savePlayers) {
            GameApp.State.savePlayers(names);
        }

        // Notify Screens to update display if needed
        // We try to access the Screens module directly, or fall back to the main UI object
        if (window.GameApp.UI.Screens && window.GameApp.UI.Screens.updateCategoryDisplay) {
            window.GameApp.UI.Screens.updateCategoryDisplay();
        } else if (window.GameApp.UI.updateCategoryDisplay) {
            window.GameApp.UI.updateCategoryDisplay();
        }
    }

    return {
        numPlayers: numPlayers,
        createPlayerElement: createPlayerElement,
        addPlayer: addPlayer,
        deletePlayer: deletePlayer,
        updatePlayerListInState: updatePlayerListInState
    };
})();
