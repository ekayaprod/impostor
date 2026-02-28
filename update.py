import re

with open('index.html', 'r') as f:
    content = f.read()

content = content.replace(
    '<label>Category: <span id="categoryDisplay">No category selected</span></label>',
    '<label>Category: <span id="categoryDisplay">No category selected</span></label>\n        <div id="setupErrorMsg" class="form-error-message" aria-live="polite"></div>'
)

with open('index.html', 'w') as f:
    f.write(content)

with open('js/modules/ui/screens/setup.js', 'r') as f:
    content = f.read()

content = content.replace(
    '''        if (num > 2 && info && info.topic && info.category) {
            $('#distributeTopicButton').show();
        } else {
            $('#distributeTopicButton').hide();
        }''',
    '''        $('#distributeTopicButton').show();

        if (num > 2 && info && info.topic && info.category) {
            $('#setupErrorMsg').removeClass('is-visible');
        }'''
)

content = content.replace(
    '''        $('#distributeTopicButton').hide();''',
    '''        $('#setupErrorMsg').removeClass('is-visible').empty();
        $('#distributeTopicButton').show();'''
)

with open('js/modules/ui/screens/setup.js', 'w') as f:
    f.write(content)


with open('js/modules/ui/screens/distribute.js', 'r') as f:
    content = f.read()

content = content.replace(
    '''        var currentTopicInfo = GameApp.State.currentTopicInfo;
        if (!currentTopicInfo) {
            console.log("Can't proceed - no topic set.");
            return;
        }

        // Save current players before distributing
        GameApp.UI.Players.updatePlayerListInState();
        var playerNames = GameApp.State.getPlayers();

        if (playerNames.length < 3) {
            alert("You need at least 3 players to play!");
            return;
        }

        GameApp.UI.Transitions.changeScreenTo('#screenDistributeTopic');''',
    '''        // Save current players before distributing
        GameApp.UI.Players.updatePlayerListInState();
        var playerNames = GameApp.State.getPlayers();
        var currentTopicInfo = GameApp.State.currentTopicInfo;

        var errors = [];
        if (playerNames.length < 3) {
            errors.push("players");
        }
        if (!currentTopicInfo || !currentTopicInfo.topic || !currentTopicInfo.category) {
            errors.push("topic");
        }

        var $errorMsg = $('#setupErrorMsg');

        if (errors.length > 0) {
            var msg = "";
            if (errors.includes("players") && errors.includes("topic")) {
                msg = "We need at least 3 artists and a secret topic before we can start!";
            } else if (errors.includes("players")) {
                msg = "An art studio needs a crowd. Invite at least 3 artists to play!";
            } else {
                msg = "What are we painting? Please pick or set a secret topic first!";
            }

            $errorMsg.text(msg).addClass('is-visible');
            return;
        }

        $errorMsg.removeClass('is-visible');
        GameApp.UI.Transitions.changeScreenTo('#screenDistributeTopic');'''
)

with open('js/modules/ui/screens/distribute.js', 'w') as f:
    f.write(content)
