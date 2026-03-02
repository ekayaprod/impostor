/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.EmptyState = (function () {
    "use strict";

    function toggle(isEmpty) {
        var $emptyState = $('#emptyPlayerState');
        if (isEmpty) {
            if ($emptyState.length) {
                $emptyState.addClass('is-visible');
            }
        } else {
            if ($emptyState.length) {
                $emptyState.removeClass('is-visible');
            }
        }
    }

    return {
        toggle: toggle
    };
})();
