/*global $, GameApp */
$(document).ready(function () {
    "use strict";

    // Initialize Foundation
    $(document).foundation();

    // Initialize State
    GameApp.State.init();

    // Event Listeners
    if (GameApp.UI.Events && GameApp.UI.Events.bindEvents) {
        GameApp.UI.Events.bindEvents();
    } else {
        console.warn("UI Events module not loaded. Event listeners not bound.");
    }

    // Start App
    GameApp.UI.buildScreen1();
});
