/*global $, GameApp */
$(document).ready(function () {
    "use strict";

    // Initialize Foundation
    $(document).foundation();

    // Initialize State
    GameApp.State.init();

    // Event Listeners
    $('#addPlayerButton').on('click', function() {
        GameApp.UI.addPlayer({ focus: true, animate: true });
    });

    $('#setTopicButton').on('click', function () {
        //clear the dialog and error state
        $('#topicInputModal #topicInput').val("").removeClass('is-invalid-input');
        $('#topicInputModal #categoryInput').val("").removeClass('is-invalid-input');
        $('#topicErrorMsg').hide();
    });

    $('#randomTopicButton').on('click', function () {
        var topicInfo = GameApp.Logic.setRandomTopic();
        GameApp.State.currentTopicInfo = topicInfo;
        GameApp.UI.updateCategoryDisplay();
    });

    $('#saveAndExitTopicInputModalButton').on('click', function () {
        var $topicInput = $('#topicInputModal #topicInput');
        var $categoryInput = $('#topicInputModal #categoryInput');
        var $errorMsg = $('#topicErrorMsg');

        var info = {
            topic: $topicInput.val().trim(),
            category: $categoryInput.val().trim()
        };

        // Reset error states
        $topicInput.removeClass('is-invalid-input').removeAttr('aria-invalid');
        $categoryInput.removeClass('is-invalid-input').removeAttr('aria-invalid');
        $errorMsg.hide().empty();

        var errors = [];
        var firstErrorInput = null;

        if (!info.topic || info.topic.length < 2) {
            $topicInput.addClass('is-invalid-input').attr('aria-invalid', 'true');
            errors.push("topic");
            if (!firstErrorInput) firstErrorInput = $topicInput;
        }
        if (!info.category || info.category.length < 2) {
            $categoryInput.addClass('is-invalid-input').attr('aria-invalid', 'true');
            errors.push("category");
            if (!firstErrorInput) firstErrorInput = $categoryInput;
        }

        if (errors.length > 0) {
            var msg = "";
            if (errors.includes("topic") && errors.includes("category")) {
                msg = "Please enter both a secret topic and a category hint to start.";
            } else if (errors.includes("topic")) {
                msg = "The game needs a secret topic to begin.";
            } else {
                msg = "Please add a category hint so players know what to expect.";
            }

            $errorMsg.text(msg).slideDown();
            if (firstErrorInput) {
                firstErrorInput.focus();
            }
            return false;
        } else {
            GameApp.State.currentTopicInfo = info;
            GameApp.UI.updateCategoryDisplay();
            $('#topicInputModal').foundation('close');
        }
    });

    // Clear error state on input
    $('#topicInputModal input').on('input', function() {
        $(this).removeClass('is-invalid-input');
        // If both inputs are now valid (or at least being edited), hide the main error message
        // A simple approach is to hide it as soon as user interacts, assuming they are fixing it.
        $('#topicErrorMsg').slideUp();
    });

    $('#editGameButton').on('click', function() {
        GameApp.UI.changeScreenTo('#screenSetPlayers');
    });

    $('#distributeTopicButton').on('click', GameApp.UI.buildScreen2);

    $('#endAndRevealButton').on('click', GameApp.UI.revealImpostor);

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

    $('#startButton').on('click', GameApp.UI.buildScreen3);

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

    // Start App
    GameApp.UI.buildScreen1();
});
