// ==UserScript==
// @name         Lag-Be-Gone 1.0
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Compresses video data to make YouTube streams less laggy.
// @author       You
// @match        *://*youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var checkVideoStart = setInterval(() => {
        var player = document.getElementById('movie_player');
        if (player && player.getPlayerState() === 1) {
            clearInterval(checkVideoStart);
            player.setPlaybackQuality && player.setPlaybackQuality('tiny');
            player.addEventListener('onStateChange', (event) => event.data === 1 && player.setPlaybackQuality && player.setPlaybackQuality('tiny'));
        }
    }, 1000);
})();
