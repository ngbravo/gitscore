let assert = require('chai').assert;
let _modifyWebpage = require('../../app/scripts/lib/modify-github-webpage');

(function() {
  'use strict';

  describe('Modify Github Webpage', function() {
    beforeEach(function() {
      // mock document
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
