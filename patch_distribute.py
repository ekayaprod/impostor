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
        }''',
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

        $errorMsg.removeClass('is-visible');'''
)

with open('js/modules/ui/screens/distribute.js', 'w') as f:
    f.write(content)
