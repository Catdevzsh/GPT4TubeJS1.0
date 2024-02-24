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

    // Function to compress video data
    function compressVideoData() {
        var player = document.getElementById('movie_player');

        // Use YouTube's API to set playback quality
        if (player && typeof player.setPlaybackQuality === 'function') {
            try {
                player.setPlaybackQuality('tiny');
                console.log(`Compressed video data.`);
            } catch (error) {
                console.error(`Failed to compress video data: ${error}`);
            }
        }
    }

    // Use YouTube's API to detect when a video starts playing
    var checkVideoStart = setInterval(function() {
        var player = document.getElementById('movie_player');
        if (player && player.getPlayerState() === 1) { // 1 means the video is playing
            clearInterval(checkVideoStart);
            compressVideoData();
            player.addEventListener('onStateChange', function(event) {
                if (event.data === 1) { // 1 means the video has started playing again
                    compressVideoData();
                }
            });
        }
    }, 1000); // Check every second
})();
