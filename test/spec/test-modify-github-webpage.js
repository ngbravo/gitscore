let assert = require('chai').assert;
let _modifyWebpage = require('../../app/scripts/lib/modify-github-webpage');
let _score = require('../../app/scripts/lib/score');
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

      it('should assign the correct class to a high score', function() {
        let highScore = _score.getMaxScore();

        const score = {aggregate: highScore};
        _modifyWebpage.writeScore(score);

        let scoreBox = document.getElementById('score-box');

        assert.equal(scoreBox.className, 'high');
      });

      it('should assign the correct class to a medium score', function() {
        let medScore = _score.getMinScore();
        medScore += (_score.getMinScore() + _score.getMaxScore()) / 2;

        const score = {aggregate: medScore};
        _modifyWebpage.writeScore(score);

        let scoreBox = document.getElementById('score-box');

        assert.equal(scoreBox.className, 'medium');
      });

      it('should assign the correct class to a low score', function() {
        let lowScore = _score.getMinScore();

        const score = {aggregate: lowScore};
        _modifyWebpage.writeScore(score);

        let scoreBox = document.getElementById('score-box');

        assert.equal(scoreBox.className, 'low');
      });

      it('should assign the correct class to an invalid score', function() {
        const invalidScore = _score.getMinScore() - 1;
        const score = {aggregate: invalidScore};
        _modifyWebpage.writeScore(score);

        let scoreBox = document.getElementById('score-box');

        assert.equal(scoreBox.className, 'invalid');
      });
    });
  });
})();
