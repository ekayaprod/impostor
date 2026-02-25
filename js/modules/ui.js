/*global $, GameApp */
window.GameApp = window.GameApp || {};

window.GameApp.UI = (function () {
    "use strict";

    // Private state for handling role reveal flow
    var pendingRoleRevealLi = null;

    function changeScreenTo(screenId) {
        var $currentScreen = $('.screen:visible');
        var $newScreen = $(screenId);
        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function showNewScreen() {
            $currentScreen.hide().removeClass('fade-out').css('opacity', 0).attr('aria-hidden', 'true');
            $newScreen.show().addClass('fade-in').attr('aria-hidden', 'false');

            // Force reflow
            void $newScreen[0].offsetWidth;

            $newScreen.removeClass('fade-in');

            // Manage Focus: Set focus to the new screen container
            $newScreen.focus();
        }

        if ($currentScreen.length === 0) {
            // First load, just show it
            $newScreen.show().css('opacity', 1).attr('aria-hidden', 'false');
            // Do not auto-focus on initial load to avoid jumping, user expects to start at top usually
            return;
        }

        if ($currentScreen.attr('id') === $newScreen.attr('id')) {
            return;
        }

        if (prefersReducedMotion) {
            showNewScreen();
        } else {
            $currentScreen.addClass('fade-out');

            var transitionEnded = false;
            var onTransitionEnd = function() {
                if (transitionEnded) return;
                transitionEnded = true;
                showNewScreen();
            };

            $currentScreen.one('transitionend', onTransitionEnd);

            // Safety timeout slightly longer than CSS transition (300ms)
            setTimeout(onTransitionEnd, 350);
        }
    }

    function updateCategoryDisplay() {
        var info = GameApp.State.currentTopicInfo;
        $('#categoryDisplay').html(info ? info.category : "No category selected");

        if (numPlayers() > 2 && info && info.topic && info.category) {
            $('#distributeTopicButton').show();
        } else {
            $('#distributeTopicButton').hide();
        }
    }

    function numPlayers() {
        return $('#playerList li').length;
    }

    function createPlayerElement(name, animate) {
        var cloned = $('#playerLiToClone').clone();
        var inp;

        cloned.removeAttr("id");
        cloned.removeAttr("style");
        cloned.addClass('playerListItem');

        if (animate) {
            cloned.addClass('player-enter');
        }

        inp = cloned.find(".playerNameInput");
        inp.val(name);

        return cloned;
    }

    function addPlayer(opts) {
        opts = opts || {};
        var n = opts.name || ("Player" + (numPlayers() + 1));
        if (typeof n !== 'string' || n.trim().length === 0) {
            n = "Player" + (numPlayers() + 1);
        }

        var $el = createPlayerElement(n, opts.animate);
        $el.appendTo('#playerList');

        if (opts.focus) {
            $el.find(".playerNameInput").focus().select();
        }

        updatePlayerListInState();
    }

    function deletePlayer(obj) {
        var li = $(obj).closest(".playerListItem");
        li.addClass('player-leave');

        setTimeout(function() {
            li.remove();
            updatePlayerListInState();
        }, 300);
    }

    function updatePlayerListInState() {
        var names = $('#playerList .playerNameInput').map(function () {
            return this.value;
        }).get();
        GameApp.State.savePlayers(names);
        updateCategoryDisplay(); // To check if we have enough players to start
    }

    function buildScreen1() {
        changeScreenTo('#screenSetPlayers');
        $('#playerList .playerListItem').remove();
        var playerNames = GameApp.State.getPlayers();

        var fragment = document.createDocumentFragment();

        playerNames.forEach(function (n, i) {
            var $el = createPlayerElement(n, false);
            $el.addClass('player-list-load-item');
            $el.css('--i', i);
            fragment.appendChild($el[0]);
        });

        $('#playerList').append(fragment);

        $('#distributeTopicButton').hide();
        GameApp.State.gInfos = [];
        GameApp.State.currentTopicInfo = null;
        updateCategoryDisplay();
    }

    function buildScreen2() {
        var currentTopicInfo = GameApp.State.currentTopicInfo;
        if (!currentTopicInfo) {
            console.log("Can't proceed - no topic set.");
            return;
        }

        // Save current players before distributing
        updatePlayerListInState();
        var playerNames = GameApp.State.getPlayers();

        if (playerNames.length < 3) {
            alert("You need at least 3 players to play!");
            return;
        }

        changeScreenTo('#screenDistributeTopic');

        //remove existing elems of show-list
        $('#playerListForShowTopic li').remove();
        $('#startButton').hide();

        // Distribute roles
        var gInfos = GameApp.Logic.distributeRoles(playerNames, currentTopicInfo);
        var fragment = document.createDocumentFragment();

        gInfos.forEach(function (info, i) {
            var labelText = info.playerName,
                inp = $("<button class='button large hollow expanded' type='button' data-open='showRoleModal'>" + labelText + "</button>"),
                li = $("<li class='role-reveal-item' style='--i: " + i + ";'>");
            inp.appendTo(li);
            inp.on('click', function () {
                showForPlayer($(this), info);
            });
            fragment.appendChild(li[0]);
        });

        $('#playerListForShowTopic').append(fragment);
    }

    function buildScreen3() {
        changeScreenTo('#screenGameInProgress');

        // Populate the game in progress list (optional, but nice)
        var list = $('#playerListForGameInProgress');
        list.empty();
        GameApp.State.getPlayers().forEach(function(name) {
            list.append('<li>' + name + '</li>');
        });
    }

    function showForPlayer(obj, info) {
        if (info.isImpostor) {
            $('#showRoleModal .topicDisplay').html("You are the Impostor.");
            $('#showRoleModal .topicDisplayLabel').hide();
        } else {
            $('#showRoleModal .topicDisplay').html(info.topic);
            $('#showRoleModal .topicDisplayLabel').show();
        }
        $('#showRoleModal .nameDisplay').html(info.playerName);
        $('#showRoleModal .categoryDisplay').html(info.category);

        // Store the element to be removed later (after modal close)
        pendingRoleRevealLi = obj.closest("li");
    }

    function handleRoleModalClose() {
        if (!pendingRoleRevealLi) return;

        var $el = pendingRoleRevealLi;
        pendingRoleRevealLi = null;

        // Apply exit animation
        $el.addClass('player-leave');

        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        // Match CSS animation duration (0.3s) or 0 if reduced motion
        var delay = prefersReducedMotion ? 0 : 300;

        setTimeout(function() {
            $el.remove();

            var remainingPlayerCount = $('#playerListForShowTopic li').length;
            if (remainingPlayerCount < 1) {
                // No more players: Show and Focus the Start Button
                $('#startButton').show().focus();
            } else {
                // Focus the next available player button to maintain keyboard flow
                var $nextBtn = $('#playerListForShowTopic li button').first();
                if ($nextBtn.length) {
                    $nextBtn.focus();
                }
            }
        }, delay);
    }

    function revealImpostor() {
        var impostorNames = GameApp.Logic.getImpostorNames();
        $('#revealModal .impostorName').html(impostorNames);
        $('#revealModal .topic').html(GameApp.State.currentTopicInfo ? GameApp.State.currentTopicInfo.topic : "");
    }

    return {
        changeScreenTo: changeScreenTo,
        updateCategoryDisplay: updateCategoryDisplay,
        addPlayer: addPlayer,
        deletePlayer: deletePlayer,
        updatePlayerListInState: updatePlayerListInState,
        buildScreen1: buildScreen1,
        buildScreen2: buildScreen2,
        buildScreen3: buildScreen3,
        revealImpostor: revealImpostor,
        handleRoleModalClose: handleRoleModalClose
    };
})();
