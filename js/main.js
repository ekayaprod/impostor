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
        //clear the dialog
        $('#topicInputModal #topicInput').val("");
        $('#topicInputModal #categoryInput').val("");
    });

    $('#randomTopicButton').on('click', function () {
        var topicInfo = GameApp.Logic.setRandomTopic();
        GameApp.State.currentTopicInfo = topicInfo;
        GameApp.UI.updateCategoryDisplay();
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
            GameApp.UI.updateCategoryDisplay();
        }
    });

    $('#editGameButton').on('click', function() {
        GameApp.UI.changeScreenTo('#screenSetPlayers');
    });

    $('#distributeTopicButton').on('click', GameApp.UI.buildScreen2);

    $('#endAndRevealButton').on('click', GameApp.UI.revealImpostor);

    $('#exitRevealModalButton').on('click', function () {
        GameApp.UI.buildScreen1();
    });

    $('#startButton').on('click', GameApp.UI.buildScreen3);

    // Event Delegation for dynamic elements
    $(document).on('click', '.deletePlayer', function() {
        GameApp.UI.deletePlayer(this);
    });

    $(document).on('input', '.playerNameInput', function() {
        GameApp.UI.updatePlayerListInState();
    });

    // Start App
    GameApp.UI.buildScreen1();
});
