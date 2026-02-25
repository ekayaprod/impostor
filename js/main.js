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
        //clear the dialog
        $('#topicInputModal #topicInput').val("");
        $('#topicInputModal #categoryInput').val("");
    });

    $('#randomTopicButton').on('click', function () {
        var topicInfo = GameApp.Logic.setRandomTopic();
        GameApp.State.currentTopicInfo = topicInfo;
        GameApp.UI.GameFlow.updateCategoryDisplay();
    });

    $('#saveAndExitTopicInputModalButton').on('click', function () {
        var info = {
            topic: $('#topicInputModal #topicInput').val(),
            category: $('#topicInputModal #categoryInput').val()
        };
        //Prevent close if topic+category are not valid
        if (!info.topic || info.topic.length < 2 || !info.category || info.category.length < 2) {
            return false;
        } else {
            GameApp.State.currentTopicInfo = info;
            GameApp.UI.GameFlow.updateCategoryDisplay();
        }
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
