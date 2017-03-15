let assert = require('chai').assert;
let _modifyWebpage = require('../../app/scripts/lib/modify-github-webpage');
let jsdom = require('jsdom-global');
let readResFile = require('./../utils/file-reader').readResFile;

(function() {
  'use strict';

  describe('Modify Github Webpage', function() {
    beforeEach(function() {
       jsdom();
       document.body.innerHTML = readResFile('github_public.html');
    });

    describe('writeScore', function() {
      it('should attach the score to a public repository');
      it('should attach the score to a private repository');

      it('should attach the score left to the name');

      it('should assign the correct id to score-box');

      it('should assign the correct class to a high score');
      it('should assign the correct class to a medium score');
      it('should assign the correct class to a low score');
      it('should assign the correct class to an invalid score');
    });
  });
})();
