/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.EmptyState = (function () {
    "use strict";

    function toggle(isEmpty) {
        var $emptyState = $('#emptyPlayerState');
        if (isEmpty) {
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

    return {
        toggle: toggle
    };
})();
