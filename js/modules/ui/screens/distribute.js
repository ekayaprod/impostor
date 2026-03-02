/*global $, GameApp */
window.GameApp = window.GameApp || {};
window.GameApp.UI = window.GameApp.UI || {};
window.GameApp.UI.Screens = window.GameApp.UI.Screens || {};

window.GameApp.UI.Screens.Distribute = (function () {
    "use strict";

    function validateSetup(playerNames, currentTopicInfo) {
        var errors = [];
        if (playerNames.length < 3) {
            errors.push("players");
        }
        if (!currentTopicInfo || !currentTopicInfo.topic || !currentTopicInfo.category) {
            errors.push("topic");
        }
        return errors;
    }

    function displayErrors(errors) {
        var $errorMsg = $('#setupErrorMsg');
        var msg = "";
        if (errors.includes("players") && errors.includes("topic")) {
            msg = "We need at least 3 artists and a secret topic before we can start!";
        } else if (errors.includes("players")) {
            msg = "An art studio needs a crowd. Invite at least 3 artists to play!";
        } else {
            msg = "What are we painting? Please pick or set a secret topic first!";
        }
        $errorMsg.text(msg).addClass('is-visible');
    }

    function renderSkeletons(gInfos, $container) {
        var skeletonFragment = document.createDocumentFragment();

        // Add aria-live announcer for accessibility
        var $announcer = $("<div aria-live='polite' class='sr-only role-announcer'>Assigning secret roles...</div>");
        skeletonFragment.appendChild($announcer[0]);

        gInfos.forEach(function (info, i) {
            var li = $("<li class='role-reveal-item role-reveal-skeleton' style='--i: " + i + ";'>");
            var skeleton = $("<div class='skeleton'></div>");
            li.append(skeleton);
            skeletonFragment.appendChild(li[0]);
        });

        $container.append(skeletonFragment);
    }

    function renderPlayerButtons(gInfos, $container) {
        var fragment = document.createDocumentFragment();
        gInfos.forEach(function (info, i) {
            var labelText = info.playerName,
                inp = $("<a class='button large hollow expanded' data-open='showRoleModal'>" + labelText + "</a>"),
                li = $("<li class='role-reveal-item' style='--i: " + i + ";'>");
            inp.appendTo(li);
            inp.on('click', function () {
                // Ensure Modals is available
                if (GameApp.UI.Modals) {
                    GameApp.UI.Modals.showForPlayer($(this), info);
                } else if (GameApp.UI.showForPlayer) {
                    // Fallback to facade if needed
                    GameApp.UI.showForPlayer($(this), info);
                } else {
                    console.error("Modals module not loaded");
                }
            });
            fragment.appendChild(li[0]);
        });

        // Smooth transition by fading out skeletons first
        var $skeletons = $container.find('.role-reveal-skeleton');
        $skeletons.addClass('fade-out');

        setTimeout(function() {
            $container.empty().append(fragment);

            // Announce completion
            $container.append("<div aria-live='polite' class='sr-only role-announcer'>Roles assigned</div>");

            // Set focus to the first button for accessibility
            $container.find('a').first().focus();
        }, 300); // Wait for skeleton fade out
    }

    function buildScreen2() {
        // Save current players before distributing
        GameApp.UI.Players.updatePlayerListInState();
        var playerNames = GameApp.State.getPlayers();
        var currentTopicInfo = GameApp.State.currentTopicInfo;

        var errors = validateSetup(playerNames, currentTopicInfo);

        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }

        $('#setupErrorMsg').removeClass('is-visible');

        GameApp.UI.Transitions.changeScreenTo('#screenDistributeTopic');

        //remove existing elems of show-list
        $('#playerListForShowTopic li').remove();
        $('#startButton').hide();

        // Distribute roles
        var gInfos = GameApp.Logic.distributeRoles(playerNames, currentTopicInfo);
        var $playerListContainer = $('#playerListForShowTopic');

        // 1. Show Loading Skeletons for Delight and Perceived Performance
        renderSkeletons(gInfos, $playerListContainer);

        // 2. Swap Skeletons with Real Buttons after a delay
        setTimeout(function() {
            renderPlayerButtons(gInfos, $playerListContainer);
        }, 800);
    }

    return {
        buildScreen2: buildScreen2
    };
})();
