'use strict';

start();

/**
 * Starts the score calculation
 */
function start() {
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
 * Writes the score to the DOM
 * @param {Number} score The score value
 */
function writeScore(score) {
  let nodeToInsert = getNodeToInsert(score);

  // TODO should find a better way to verify. Maybe using the GitHub API(?)
  let repoTopName = document.getElementsByClassName('public')[0];
  if(repoTopName === undefined) {
    repoTopName = document.getElementsByClassName('private')[0];
  }

  repoTopName.insertBefore(nodeToInsert, repoTopName.firstChild);
}

/**
 * Generates the DOM node that will be inserted in the document
 * @param {Number} score The score value
 * @return {Text}
 */
function getNodeToInsert(score) {
  let node = document.createTextNode(score.aggregate + '');
  return node;
}
