/*global TOPICS */
window.GameApp = window.GameApp || {};

window.GameApp.State = (function () {
    "use strict";

    var currentTopicInfo = null,
        gInfos = [],
        topicsInfoList = (typeof TOPICS !== 'undefined') ? TOPICS.data : [],
        playedTopics = [],
        allImpostorsModeTriggered = false,
        playerNames = [];

    function init() {
        playerNames = restorePlayersFromStorage();
    }

    function restorePlayersFromStorage() {
        var namesStr = localStorage.getItem("playerNames"),
            names;
        if (namesStr) {
            try {
                names = JSON.parse(namesStr);
                if (Array.isArray(names)) {
                    return names.filter(function(name) {
                        return typeof name === 'string' && name.trim().length > 0;
                    });
                }
            } catch (e) {
                console.error("Error parsing player names from storage:", e);
            }
        }
        return [];
    }

    function savePlayers(names) {
        playerNames = names;
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("playerNames", JSON.stringify(playerNames));
        } else {
            console.log("storage is unsupported. player list will not be stored.");
        }
    }

    return {
        init: init,

        get currentTopicInfo() { return currentTopicInfo; },
        set currentTopicInfo(val) { currentTopicInfo = val; },

        get gInfos() { return gInfos; },
        set gInfos(val) { gInfos = val; },

        get topicsInfoList() { return topicsInfoList; },

        get playedTopics() { return playedTopics; },
        set playedTopics(val) { playedTopics = val; },

        get allImpostorsModeTriggered() { return allImpostorsModeTriggered; },
        set allImpostorsModeTriggered(val) { allImpostorsModeTriggered = val; },

        getPlayers: function() { return playerNames; },
        savePlayers: savePlayers
    };
})();
