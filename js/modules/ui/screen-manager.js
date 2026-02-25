/*global $ */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.ScreenManager = (function () {
    "use strict";

    function changeScreenTo(screenId) {
        var $currentScreen = $('.screen.active');
        var $newScreen = $(screenId);

        // If no screen is active, check for any visible screen (legacy/fallback)
        if ($currentScreen.length === 0) {
            $currentScreen = $('.screen:visible');
        }

        if ($currentScreen.length === 0) {
            // First load, just show it
            $newScreen.addClass('active').attr('aria-hidden', 'false');
            return;
        }

        if ($currentScreen.attr('id') === $newScreen.attr('id')) {
            return;
        }

        // Sequential transition: Fade out current -> Wait -> Fade in new
        $currentScreen.addClass('leaving').removeClass('active').attr('aria-hidden', 'true');

        // Wait for transition to end
        var transitionEnded = false;
        var onTransitionEnd = function() {
            if (transitionEnded) return;
            transitionEnded = true;

            $currentScreen.removeClass('leaving').hide();

            // Prepare new screen
            $newScreen.show().addClass('entering').attr('aria-hidden', 'false');

            // Force reflow
            void $newScreen[0].offsetWidth;

            // Fade in new screen
            $newScreen.removeClass('entering').addClass('active').focus();
        };

        $currentScreen.one('transitionend', onTransitionEnd);

        // Fallback for no transition support or interrupted transitions
        setTimeout(onTransitionEnd, 350); // Slightly longer than CSS transition time (300ms)
    }

    return {
        changeScreenTo: changeScreenTo
    };
})();
