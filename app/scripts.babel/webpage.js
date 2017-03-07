'use strict';

/**
 * Starts the score calculation
 */
function load() {
  let score = getScore();
  writeScore(score);
}

/**
 * Verifies if the repository is public or private
 * @return {boolean} true if it is public, else false
 */
function repositoryIsPublic() {
  // TODO should find a better way to verify. Maybe using the GitHub API(?)
  if(document.getElementsByClassName('public')[0] !== undefined) {
    return true;
  }
  return false;
}

/**
 * Gets the node subtree where the score box will be inserted at
 * @return {object} the node subtree
 */
 function getSubtreeToInsert() {
  if (repositoryIsPublic()) {
    return(document.getElementsByClassName('public')[0]);
  }
  return(document.getElementsByClassName('private')[0]);
}

/**
 * Writes the score block to the DOM
 * @param {object} score The score values
 */
function writeScore(score) {
  let nodeToInsert = getNodeToInsert(score);
  let repoTopName = getSubtreeToInsert();
  repoTopName.insertBefore(nodeToInsert, repoTopName.firstChild);
}

// Use to load functions from other files. Clashes with linter
// function loadScript(scriptName, callback) {
//     let scriptEl = document.createElement('script');
//     scriptEl.src = chrome.extension.getURL('scripts/' + scriptName + '.js');
//     scriptEl.addEventListener('load', callback, false);
//     document.head.appendChild(scriptEl);
// }

/**
 * Generates the DOM node that will be inserted in the document
 * @param {object} score The score values
 * @return {object} The DOM node to insert
 */
function getNodeToInsert(score) {
  let node = document.createTextNode(score.aggregate + '');
  return node;
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
