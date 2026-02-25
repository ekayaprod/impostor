/*global $, GameApp */
$(document).ready(function () {
    "use strict";

    // Initialize Foundation
    $(document).foundation();

    // Initialize State
    GameApp.State.init();

    // Event Listeners
    $('#addPlayerButton').on('click', function() {
        GameApp.UI.PlayerManager.addPlayer({ focus: true, animate: true });
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
        GameApp.UI.GameFlow.updateCategoryDisplay();
    });

    $('#saveAndExitTopicInputModalButton').on('click', function () {
        var $topicInput = $('#topicInputModal #topicInput');
        var $categoryInput = $('#topicInputModal #categoryInput');
        var $errorMsg = $('#topicErrorMsg');

        var info = {
            topic: $topicInput.val(),
            category: $categoryInput.val()
        };

        // Reset error states
        $topicInput.removeClass('is-invalid-input');
        $categoryInput.removeClass('is-invalid-input');
        $errorMsg.hide();

        var errors = [];
        if (!info.topic || info.topic.trim().length < 2) {
            $topicInput.addClass('is-invalid-input');
            errors.push("topic");
        }
        if (!info.category || info.category.trim().length < 2) {
            $categoryInput.addClass('is-invalid-input');
            errors.push("category");
        }

        if (errors.length > 0) {
            $errorMsg.text("We need a topic and category to start the game. Give us a hint!").slideDown();
            return false;
        } else {
            GameApp.State.currentTopicInfo = info;
            GameApp.UI.GameFlow.updateCategoryDisplay();
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
        GameApp.UI.ScreenManager.changeScreenTo('#screenSetPlayers');
    });

    $('#distributeTopicButton').on('click', GameApp.UI.GameFlow.buildScreen2);

    $('#endAndRevealButton').on('click', GameApp.UI.GameFlow.revealImpostor);

    $('#exitRevealModalButton').on('click', function () {
        GameApp.UI.GameFlow.buildScreen1();
    });

    $('#startButton').on('click', GameApp.UI.GameFlow.buildScreen3);

    // Event Delegation for dynamic elements
    $(document).on('click', '.deletePlayer', function() {
        GameApp.UI.PlayerManager.deletePlayer(this);
    });

    $(document).on('input', '.playerNameInput', function() {
        GameApp.UI.PlayerManager.updatePlayerListInState();
    });

    // Start App
    GameApp.UI.GameFlow.buildScreen1();
});
