/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Modals = (function () {
    "use strict";

    // Store reference to the button that opened the modal
    // No longer using global $lastTriggerButton to avoid race conditions
    // Instead we will store it on the modal element via .data()

    function showForPlayer(obj, info) {
        // Store the trigger button on the modal itself
        $('#showRoleModal').data('trigger-btn', obj);

        if (info.isImpostor) {
            $('#showRoleModal .topicDisplay').html("You are the Impostor.");
            $('#showRoleModal .topicDisplayLabel').hide();
        } else {
            $('#showRoleModal .topicDisplay').html(info.topic);
            $('#showRoleModal .topicDisplayLabel').show();
        }
        $('#showRoleModal .nameDisplay').html(info.playerName);
        $('#showRoleModal .categoryDisplay').html(info.category);

        // Removed immediate deletion of li element
    }

    function handleRoleModalClose() {
        var $btn = $('#showRoleModal').data('trigger-btn');
        if (!$btn || $btn.length === 0) return;

        // Clear the stored trigger immediately so subsequent closes don't re-trigger
        $('#showRoleModal').removeData('trigger-btn');

        var $li = $btn.closest("li");

        // Find the next focusable element *before* removing the current one
        var $nextLi = $li.next('li');
        var $nextButton = $nextLi.find('a');

        // Add exit animation class
        $li.addClass('player-leave');

        // Function to clean up after animation
        var cleanup = function() {
            // Check if element is still in DOM before trying to remove
            if ($li.parent().length === 0) return;

            $li.remove();
            var remainingPlayerCount = $('#playerListForShowTopic li').length;

            if (remainingPlayerCount < 1) {
                $('#startButton').show().focus();
            } else if ($nextButton.length) {
                $nextButton.focus();
            } else {
                 // If no next button (was last item), try previous
                var $prevLi = $('#playerListForShowTopic li').last();
                if ($prevLi.length) {
                     $prevLi.find('a').focus();
                }
            }
        };

        // Listen for animation end, with fallback
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
             cleanup();
        } else {
            $li.one('animationend transitionend', cleanup);
             // Fallback timeout in case animation fails
            setTimeout(cleanup, 400);
        }
    }

    function revealImpostor() {
        var impostorNames = GameApp.Logic.getImpostorNames();
        $('#revealModal .impostorName').html(impostorNames);
        $('#revealModal .topic').html(GameApp.State.currentTopicInfo ? GameApp.State.currentTopicInfo.topic : "");
    }

    return {
        showForPlayer: showForPlayer,
        revealImpostor: revealImpostor,
        handleRoleModalClose: handleRoleModalClose
    };
})();
