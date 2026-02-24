/*global $, GameApp */
window.GameApp = window.GameApp || {};

window.GameApp.UI = (function () {
    "use strict";

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

    function addPlayer(opts) {
        opts = opts || {};
        var n = opts.name || ("Player" + (numPlayers() + 1));
        if (typeof n !== 'string' || n.trim().length === 0) {
            n = "Player" + (numPlayers() + 1);
        }

        var cloned = $('#playerLiToClone').clone(),
            inp;

        cloned.removeAttr("id");
        cloned.removeAttr("style");
        cloned.addClass('playerListItem');

        if (opts.animate) {
            cloned.addClass('player-enter');
        }

        cloned.appendTo('#playerList');
        inp = cloned.find(".playerNameInput");
        inp.val(n);

        if (opts.focus) {
            inp.focus();
            inp.select();
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

        playerNames.forEach(function (n) {
            addPlayer({
                name: n,
                animate: false
            });
        });

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
                inp = $("<a class='button large hollow expanded' data-open='showRoleModal'>" + labelText + "</a>"),
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

        obj.closest("li").remove();
        var remainingPlayerCount = $('#playerListForShowTopic li').length;
        if (remainingPlayerCount < 1) {
            $('#startButton').show();
        }
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
        revealImpostor: revealImpostor
    };
})();
