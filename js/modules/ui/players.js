/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Players = (function () {
    "use strict";

    function numPlayers() {
        return $('#playerList li').length;
    }

    // Helper to get only the player list items, ignoring empty state or other potential children
    function getPlayerListItems() {
        return $('#playerList li.playerListItem');
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

        // Update aria-label for delete button to be specific
        var deleteBtn = cloned.find(".deletePlayer");
        deleteBtn.attr("aria-label", "Remove " + name);

        return cloned;
    }

    function addPlayer(opts) {
        opts = opts || {};
        // Use getPlayerListItems to get accurate count of actual players
        var currentCount = getPlayerListItems().length;
        var n = opts.name || ("Player" + (currentCount + 1));
        if (typeof n !== 'string' || n.trim().length === 0) {
            n = "Player" + (currentCount + 1);
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

        // Fix focus dropping to body: Try to focus adjacent player's delete button or add button
        var nextBtn = li.next('.playerListItem').find('.deletePlayer');
        if (nextBtn.length === 0) {
            nextBtn = li.prev('.playerListItem').find('.deletePlayer');
        }
        if (nextBtn.length === 0) {
            nextBtn = $('#addPlayerButton');
        }

        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            li.remove();
            nextBtn.focus();
            updatePlayerListInState();
            return;
        }

        li.addClass('player-leave');

        var transitionEnded = false;
        function onEnd() {
            if (transitionEnded) return;
            transitionEnded = true;
            li.remove();
            nextBtn.focus();
            updatePlayerListInState();
        }

        li.one('animationend transitionend', onEnd);
        setTimeout(onEnd, 350);
    }

    function updatePlayerListInState() {
        // Also update the aria-labels of delete buttons when names change
        $('#playerList .playerListItem').each(function() {
            var $li = $(this);
            var name = $li.find('.playerNameInput').val();
            $li.find('.deletePlayer').attr('aria-label', 'Remove ' + name);
        });

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
