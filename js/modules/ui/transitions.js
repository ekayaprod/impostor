/*global $ */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Transitions = (function () {
    "use strict";

    function changeScreenTo(screenId) {
        var $currentScreen = $('.screen:visible');
        var $newScreen = $(screenId);
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function showNewScreen() {
            $currentScreen.hide().removeClass('fade-out').css('opacity', 0).attr('aria-hidden', 'true');
            $newScreen.show().addClass('fade-in').attr('aria-hidden', 'false');

            // Force reflow to restart animation/transition
            void $newScreen[0].offsetWidth;

            $newScreen.removeClass('fade-in');

            // Manage Focus: Set focus to the new screen container for accessibility
            $newScreen.focus();
        }

        if ($currentScreen.length === 0) {
            // First load, just show it
            $newScreen.show().css('opacity', 1).attr('aria-hidden', 'false');
            // Do not auto-focus on initial load to avoid jumping, user expects to start at top usually
            return;
        }

        if ($currentScreen.attr('id') === $newScreen.attr('id')) {
            return;
        }

        if (prefersReducedMotion) {
            showNewScreen();
        } else {
            $currentScreen.addClass('fade-out');

            var transitionEnded = false;
            var onTransitionEnd = function() {
                if (transitionEnded) return;
                transitionEnded = true;
                showNewScreen();
            };

            $currentScreen.one('transitionend', onTransitionEnd);

            // Safety timeout slightly longer than CSS transition (300ms)
            setTimeout(onTransitionEnd, 350);
        }
    }

    return {
        changeScreenTo: changeScreenTo
    };
})();
