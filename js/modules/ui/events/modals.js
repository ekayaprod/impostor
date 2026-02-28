/*global $, GameApp */
$(document).ready(function () {
    "use strict";

    // Handle Role Reveal Modal Close
    $('#showRoleModal').on('closed.zf.reveal', function() {
        if (GameApp.UI.Modals && GameApp.UI.Modals.handleRoleModalClose) {
            GameApp.UI.Modals.handleRoleModalClose();
        } else if (GameApp.UI.handleRoleModalClose) {
            // Fallback to facade if needed
            GameApp.UI.handleRoleModalClose();
        }
    });

    $('#exitRevealModalButton').on('click', function () {
        GameApp.UI.buildScreen1();
    });

});
