/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

window.GameApp.UI.Screens = (function () {
    "use strict";

    // Facade for backward compatibility and centralized access
    // Delegates to specific sub-modules

    function updateCategoryDisplay() {
        if (GameApp.UI.Screens.Setup && GameApp.UI.Screens.Setup.updateCategoryDisplay) {
            return GameApp.UI.Screens.Setup.updateCategoryDisplay();
        } else {
            console.error("Setup screen module not loaded!");
        }
    }

    function buildScreen1() {
        if (GameApp.UI.Screens.Setup && GameApp.UI.Screens.Setup.buildScreen1) {
            return GameApp.UI.Screens.Setup.buildScreen1();
        } else {
            console.error("Setup screen module not loaded!");
        }
    }

    function buildScreen2() {
        if (GameApp.UI.Screens.Distribute && GameApp.UI.Screens.Distribute.buildScreen2) {
            return GameApp.UI.Screens.Distribute.buildScreen2();
        } else {
            console.error("Distribute screen module not loaded!");
        }
    }

    function buildScreen3() {
        if (GameApp.UI.Screens.Game && GameApp.UI.Screens.Game.buildScreen3) {
            return GameApp.UI.Screens.Game.buildScreen3();
        } else {
            console.error("Game screen module not loaded!");
        }
    }

    return {
        updateCategoryDisplay: updateCategoryDisplay,
        buildScreen1: buildScreen1,
        buildScreen2: buildScreen2,
        buildScreen3: buildScreen3
    };
})();
