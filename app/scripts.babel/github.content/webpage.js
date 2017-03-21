'use strict';

import $ from 'jquery';
import {getScore} from '../lib/score';
import {tryWriteScore} from '../lib/modify-github-webpage';

let score;
/**
 * Starts the score calculation
 */
export function load() {
  if(!score) {
    score = getScore();
  }
  tryWriteScore(score);
  observeRemoval();
}

/**
* Checks is #score-box is removed, and reinstates it
* TODO: this without polling
*/
function observeRemoval() {
    let currenthtml;
    let latesthtml;

    $.get(window.location.href, function(data) {
        currenthtml = data;
        latesthtml = data;
    });

    setInterval(function() {
        $.get(window.location.href, function(data) {
            latesthtml = data;
        });

        if(currenthtml != latesthtml) {
            tryWriteScore(score);
        }
    }, 1000);
}

window.onhashchange = load();
