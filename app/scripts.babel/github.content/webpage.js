'use strict';

import {getScore} from '../lib/score';
import {writeScore} from '../lib/modify-github-webpage';

/**
 * Starts the score calculation
 */
export function load() {
  let score = getScore();
  writeScore(score);
}

/**
* @param {object} e The click event
* TODO we shouldn't be bypassing AJAX
* Finds out when a link is opened though AJAX, and just reloads the target,
* essentialy bypassing the use of AJAX
*/
window.onclick = function(e) {
  if (e.target.tagName === 'A') {
    // clicked a link and DOM will be reloaded
    window.location.href = e.target.href;
  } else if (e.target.tagName === 'SPAN') {
    // check if contained in an <a> tag
    if (e.target.parentNode.tagName === 'A') {
      window.location.href = e.target.parentNode.href;
    }
  }
};

window.onhashchange = load();

window.addEventListener('popstate', function(event) {
  window.location.href = event.target.location.href;
}, false);
