'use strict';

/**
 * Starts the score calculation
 */
function onLoad() {
  let score = getScore();
  writeScore(score);
}

/**
 * Gets the repository score
 * @return {object} The score information
 */
function getScore() {
  return {
    aggregate: 2,
  };
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

/**
 * Generates the DOM node that will be inserted in the document
 * @param {object} score The score values
 * @return {object} The DOM node to insert
 */
function getNodeToInsert(score) {
  let node = document.createTextNode(score.aggregate + '');
  return node;
}

window.onhashchange = onLoad();
