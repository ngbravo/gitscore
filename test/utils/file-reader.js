'use strict';

let fs = require('fs');

/**
 * Adds two numbers together.
 * @param {string} file The path to the file relative to test/res.
 * @return {string} The file's contents.
 */
export function readResFile(file) {
  const relFilePath = 'test/res/' + file;

  let data = fs.readFileSync(relFilePath, 'utf8');
  return data;
}

export default {
  readResFile,
};
