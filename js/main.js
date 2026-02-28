/*global $, GameApp */
$(document).ready(function () {
    "use strict";

    // Initialize Foundation
    $(document).foundation();

    // Initialize State
    GameApp.State.init();

    // Start App
    GameApp.UI.buildScreen1();
});
