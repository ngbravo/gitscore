'use strict';

const baseURL = 'https://api.github.com';

// const clientID = 'CLIENT_ID';
// const clientSecret = 'CLIENT_SECRET';
// let token;

/**
 * Uses OAuth2 to get a token
 * @return {string} The OAuth2 token
 */
// function authenticate() {
//   TODO should authenticate and get a token
//   return token;
// }

/**
 * Queries the GitHub API for the repo's information
 * @param {string} username The repo's owner
 * @param {string} repository The repo's name
 * @return {object} Repository
 */
export function getRepository(username, repository) {
  let request = new XMLHttpRequest();
  const method = 'GET';
  const url = baseURL + '/repos/' + username + '/' + repository;
  const isAsync = false;
  request.open(method, url, isAsync);
  request.send();

  console.log(request.responseText);
  return request.responseText;
}
