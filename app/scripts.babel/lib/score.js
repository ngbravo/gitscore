'use strict';

import * as githubAPI from './github-api';

let score;

/**
 * Gets the repository score
 * @param {string} username The repo's owner
 * @param {string} repository The repo's name
 * @return {object} The score information
 */
export function getScore(username, repository) {
  if(score) {
    return score;
  }

  console.log(username);
  console.log(repository);
  console.log(githubAPI.getRepository(username, repository));

  return {
    aggregate: 100,
  };
}

/**
 * Gets the maximum score
 * @return {Number} The maximum score
 */
export function getMaxScore() {
  return 100;
}

/**
 * Gets the minimum score
 * @return {Number} The minimum score
 */
export function getMinScore() {
  return 0;
}

export default {
  getScore,
  getMaxScore,
  getMinScore,
};
