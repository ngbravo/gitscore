'use strict';

/**
 * Gets the repository score
 * @return {object} The score information
 */
export function getScore() {
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
