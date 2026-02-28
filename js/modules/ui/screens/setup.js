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

        var $distBtn = $('#distributeTopicButton');
        if (num > 2 && info && info.topic && info.category) {
            if ($distBtn.is(':hidden') || $distBtn.hasClass('fade-leave')) {
                $distBtn.show().removeClass('fade-leave').addClass('fade-enter');
            }
        } else {
            if ($distBtn.is(':visible') || $distBtn.hasClass('fade-enter')) {
                $distBtn.removeClass('fade-enter').addClass('fade-leave');
                setTimeout(function() {
                     if ($distBtn.hasClass('fade-leave')) {
                         $distBtn.hide();
                     }
                }, 300);
            }
        }

        // Handle Empty State Visibility
        var $emptyState = $('#emptyPlayerState');
        if (num === 0) {
            if ($emptyState.length && ($emptyState.is(':hidden') || $emptyState.hasClass('fade-leave'))) {
                $emptyState.show().removeClass('fade-leave').addClass('fade-enter');
            }
        } else {
            if ($emptyState.length && ($emptyState.is(':visible') || $emptyState.hasClass('fade-enter'))) {
                $emptyState.removeClass('fade-enter').addClass('fade-leave');
                // CSS transition will handle opacity
                // We rely on CSS to hide it after transition or keep it in DOM but invisible
                setTimeout(function() {
                     if ($('#playerList li').length > 0) { // Check again in case state changed
                        $emptyState.hide();
                    }
                }, 300);
            }
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

        $('#distributeTopicButton').hide().removeClass('fade-enter').removeClass('fade-leave');
        GameApp.State.gInfos = [];
        GameApp.State.currentTopicInfo = null;
        updateCategoryDisplay();
    }

    return {
        updateCategoryDisplay: updateCategoryDisplay,
        buildScreen1: buildScreen1
    };
})();
