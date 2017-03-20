'use strict';

import {getMaxScore, getMinScore} from './score';

/**
 * Writes the score block to the DOM
 * @param {object} score The score values
 */
export function writeScore(score) {
  let nodeToInsert = getNodeToInsert(score);
  let repoTopName = getSubtreeToInsert();
  repoTopName.insertBefore(nodeToInsert, repoTopName.firstChild);
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
 * Generates the DOM node that will be inserted in the document
 * @param {object} score The score values
 * @return {object} The DOM node to insert
 */
function getNodeToInsert(score) {
  let node = document.createElement('span');
  node.id = 'score-box';
  node.innerHTML = score.aggregate + '';

  const maxScore = getMaxScore();
  const minScore = getMinScore();

  if (score.aggregate <= maxScore && score.aggregate >= minScore) {
    if (score.aggregate >= (maxScore - minScore) * 2 / 3 + minScore) {
      node.className = 'high';
    } else if (score.aggregate >= (maxScore - minScore) * 1 / 3 + minScore) {
      node.className = 'medium';
    } else {
      node.className = 'low';
    }
  } else {
    node.className = 'invalid';
  }

  return node;
}

export default {
  writeScore,
};
