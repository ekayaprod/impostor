/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};

(function () {
    "use strict";

    var UI = window.GameApp.UI;

    // Ensure sub-modules are loaded
    if (!UI.Transitions || !UI.Players || !UI.Screens || !UI.Modals) {
        console.warn("One or more UI sub-modules are missing. Ensure they are loaded before ui.js.");
    }

    // Attach Facade Methods
    UI.changeScreenTo = function(screenId) {
        return UI.Transitions.changeScreenTo(screenId);
    };

    UI.addPlayer = function(opts) {
        return UI.Players.addPlayer(opts);
    };

    UI.deletePlayer = function(obj) {
        return UI.Players.deletePlayer(obj);
    };

    UI.updatePlayerListInState = function() {
        return UI.Players.updatePlayerListInState();
    };

    UI.updateCategoryDisplay = function() {
        return UI.Screens.updateCategoryDisplay();
    };

    UI.buildScreen1 = function() {
        return UI.Screens.buildScreen1();
    };

    UI.buildScreen2 = function() {
        return UI.Screens.buildScreen2();
    };

    UI.buildScreen3 = function() {
        return UI.Screens.buildScreen3();
    };

    UI.revealImpostor = function() {
        return UI.Modals.revealImpostor();
    };

})();
