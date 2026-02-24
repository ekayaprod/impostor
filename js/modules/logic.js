/*global _, GameApp */
window.GameApp = window.GameApp || {};

window.GameApp.Logic = (function () {
    "use strict";

    function pick(arr) {
        return _.sample(arr);
    }

    function randInt(n) {
        return Math.floor(Math.random() * n);
    }

    function setRandomTopic() {
        var state = GameApp.State;

        // "Oops! All Impostors" chance
        // 1/500 chance, never twice in one session.
        if (!state.allImpostorsModeTriggered && Math.random() < (1 / 500)) {
            state.allImpostorsModeTriggered = true;
            return {
                topic: "All Impostors",
                category: "Special Event"
            };
        }

        var availableTopics = _.filter(state.topicsInfoList, function (topic) {
            return !_.contains(state.playedTopics, topic);
        });

        if (availableTopics.length === 0) {
            availableTopics = state.topicsInfoList;
            state.playedTopics = [];
        }

        var randomPick = pick(availableTopics);
        state.playedTopics.push(randomPick);
        return randomPick;
    }

    function distributeRoles(playerNames, topicInfo) {
        var topic = topicInfo.topic,
            category = topicInfo.category,
            gInfos = [],
            impostorInfo;

        playerNames.forEach(function (playerName) {
            gInfos.push({
                category: category,
                topic: topic,
                isImpostor: false,
                playerName: playerName
            });
        });

        if (topic.toLowerCase() === "all impostors") {
            gInfos.forEach(function (info) {
                info.topic = "???";
                info.isImpostor = true;
            });
        } else {
            impostorInfo = _.sample(gInfos);
            impostorInfo.topic = "???";
            impostorInfo.isImpostor = true;
        }

        GameApp.State.gInfos = gInfos;
        return gInfos;
    }

    function getImpostorNames() {
        return GameApp.State.gInfos.filter(function (info) {
            return info.isImpostor;
        }).map(function (info) {
            return info.playerName;
        }).join(", ");
    }

    return {
        setRandomTopic: setRandomTopic,
        distributeRoles: distributeRoles,
        getImpostorNames: getImpostorNames
    };
})();
