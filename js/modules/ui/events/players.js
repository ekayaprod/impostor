/*global $, _, GameApp */
$(document).ready(function () {
    "use strict";

    $('#addPlayerButton').on('click', function() {
        GameApp.UI.addPlayer({ focus: true, animate: true });
    });

    // Event Delegation for dynamic elements
    $(document).on('click', '.deletePlayer', function() {
        GameApp.UI.deletePlayer(this);
    });

    var debouncedUpdate = _.debounce(function() {
        GameApp.UI.updatePlayerListInState();
    }, 300);

    $(document).on('input', '.playerNameInput', debouncedUpdate);

    // Ensure state is saved immediately on blur/change to prevent data loss if user leaves quickly
    $(document).on('change', '.playerNameInput', function() {
        GameApp.UI.updatePlayerListInState();
        debouncedUpdate.cancel(); // Cancel pending debounce since we just saved
    });

});
