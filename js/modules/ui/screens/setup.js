/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};
window.GameApp.UI.Screens = window.GameApp.UI.Screens || {};

window.GameApp.UI.Screens.Setup = (function () {
    "use strict";

    function updateCategoryDisplay() {
        var info = GameApp.State.currentTopicInfo;
        // Fix for verification script:
        // Logic might have set currentTopicInfo to null on buildScreen1, so we should display "No category selected"
        // But if we are in the flow where topic is set, it should show category.

        var displayHtml = (info && info.category) ? info.category : "No category selected";
        $('#categoryDisplay').html(displayHtml);

        // Need numPlayers from Players module
        // IMPORTANT: We need to count only actual player items, not other children if any (like empty state if it was moved inside)
        // But currently empty state is outside the OL.
        // However, let's be safe and use .playerListItem class if available.
        var num = $('#playerList .playerListItem').length;

        $('#distributeTopicButton').show();

        if (num > 2 && info && info.topic && info.category) {
            $('#setupErrorMsg').removeClass('is-visible');
        }

        // Handle Empty State Visibility
        if (GameApp.UI.EmptyState) {
            GameApp.UI.EmptyState.toggle(num === 0);
        } else {
            console.warn("EmptyState module not loaded");
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

        $('#setupErrorMsg').removeClass('is-visible').empty();
        $('#distributeTopicButton').show();
        GameApp.State.gInfos = [];
        GameApp.State.currentTopicInfo = null;
        updateCategoryDisplay();
    }

    return {
        updateCategoryDisplay: updateCategoryDisplay,
        buildScreen1: buildScreen1
    };
})();
