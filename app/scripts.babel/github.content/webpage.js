'use strict';

import {tryWriteScore, isScoreWritten} from '../lib/github-webpage';

/**
 * Starts the score calculation
 */
export function load() {
  tryWriteScore();
  observeRemoval();
}

/**
* Checks is #score-box is removed, and reinstates it
* TODO: this without polling
*/
function observeRemoval() {
    setInterval(function() {
        if(!isScoreWritten()) {
            tryWriteScore();
        }
    }, 1000);
}

window.onhashchange = load();
