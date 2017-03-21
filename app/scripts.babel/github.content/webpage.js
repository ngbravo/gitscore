'use strict';

import {getScore} from '../lib/score';
import {tryWriteScore, isScoreWritten} from '../lib/modify-github-webpage';

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
    setInterval(function() {
        if(!isScoreWritten()) {
            tryWriteScore(score);
        }
    }, 1000);
}

window.onhashchange = load();
