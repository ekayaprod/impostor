/*global $, GameApp */
$(document).ready(function () {
    "use strict";

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
                msg = "Let's get started! Please add a Secret Topic and a Category hint.";
            } else if (errors.includes("topic")) {
                msg = "We need a Secret Topic to start the round. Can you add one?";
            } else {
                msg = "Don't leave the Impostor guessing—give them a Category hint!";
            }

            $errorMsg.text(msg).slideDown();
            if (firstErrorInput) {
                firstErrorInput.focus();
            }
            return false;
        } else {
            GameApp.State.currentTopicInfo = info;
            // Explicitly call the update method from the facade
            if (GameApp.UI.Screens && GameApp.UI.Screens.updateCategoryDisplay) {
                GameApp.UI.Screens.updateCategoryDisplay();
            } else if (GameApp.UI.updateCategoryDisplay) {
                GameApp.UI.updateCategoryDisplay();
            }
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

});
