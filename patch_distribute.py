import re

with open("js/modules/ui/screens/distribute.js", "r") as f:
    content = f.read()

old_code = """        // Distribute roles
        var gInfos = GameApp.Logic.distributeRoles(playerNames, currentTopicInfo);
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

        $('#playerListForShowTopic').append(fragment);"""

new_code = """        // Distribute roles
        var gInfos = GameApp.Logic.distributeRoles(playerNames, currentTopicInfo);
        var $playerListContainer = $('#playerListForShowTopic');

        // 1. Show Loading Skeletons for Delight and Perceived Performance
        var skeletonFragment = document.createDocumentFragment();

        // Add aria-live announcer for accessibility
        var $announcer = $("<div aria-live='polite' class='sr-only role-announcer'>Assigning secret roles...</div>");
        skeletonFragment.appendChild($announcer[0]);

        gInfos.forEach(function (info, i) {
            var li = $("<li class='role-reveal-item' style='--i: " + i + "; margin-bottom: 1rem;'>");
            var skeleton = $("<div class='skeleton' style='height: 3.5rem; border-radius: 8px;'></div>");
            li.append(skeleton);
            skeletonFragment.appendChild(li[0]);
        });

        $playerListContainer.append(skeletonFragment);

        // 2. Swap Skeletons with Real Buttons after a delay
        setTimeout(function() {
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

            $playerListContainer.empty().append(fragment);

            // Announce completion
            $playerListContainer.append("<div aria-live='polite' class='sr-only role-announcer'>Roles assigned</div>");

            // Set focus to the first button for accessibility
            $playerListContainer.find('a').first().focus();
        }, 800);"""

content = content.replace(old_code, new_code)

with open("js/modules/ui/screens/distribute.js", "w") as f:
    f.write(content)
