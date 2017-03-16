let assert = require('chai').assert;
let _modifyWebpage = require('../../app/scripts/lib/modify-github-webpage');
let _score = require('../../app/scripts/lib/score');
let jsdom = require('jsdom-global');
let readResFile = require('./../utils/file-reader').readResFile;

const testScores = {
  high: {
    aggregate: _score.getMaxScore(),
  },
  medium: {
    aggregate: _score.getMinScore() +
      (_score.getMinScore() + _score.getMaxScore()) / 2,
  },
  low: {
    aggregate: _score.getMinScore(),
  },
  invalid: {
    aggregate: _score.getMinScore() - 1,
  },
};

(function() {
  'use strict';

  describe('Modify Github Webpage', function() {
    beforeEach(function() {
       jsdom();
       document.body.innerHTML = readResFile('github_public.html');
    });

    describe('writeScore', function() {
      const placementTests = [
        {
          repositoryType: 'public',
          expectedPosition: 0,
        },
        {
          repositoryType: 'private',
          expectedPosition: 0,
        },
      ];
      placementTests.forEach(function(placementTest) {
        it('should attach the score to the right of a ' +
        placementTest.repositoryType + ' repository\'s name', function() {
          // load private HTML version instead of default public one
          if (placementTest.repositoryType === 'private') {
            document.body.innerHTML = readResFile('github_private.html');
          }

          // check that score-box is not present beforehand
          assert.isNotOk(document.getElementById('score-box'));

          _modifyWebpage.writeScore(testScores.medium);

          // assert score-box is now present
          assert.isOk(document.getElementById('score-box'));

          // assert position
          const targetNode = document.getElementsByClassName(
            placementTest.repositoryType)[0];
          const expectedPosition = placementTest.expectedPosition;
          assert.equal(targetNode.childNodes[expectedPosition].id, 'score-box');
        });
      });

      const classTests = [
        {
          score: testScores.high,
          expected: 'high',
        },
        {
          score: testScores.medium,
          expected: 'medium',
        },
        {
          score: testScores.low,
          expected: 'low',
        },
        {
          score: testScores.invalid,
          expected: 'invalid',
        },
      ];
      classTests.forEach(function(classTest) {
        it('should assign the correct class to a ' + classTest.expected +
        ' score', function() {
          const score = classTest.score;

          _modifyWebpage.writeScore(score);

          let scoreBox = document.getElementById('score-box');

          // assert the score was properly written
          assert.equal(classTest.score.aggregate, scoreBox.innerHTML);

          // assert the score's class is OK
          assert.equal(scoreBox.className, classTest.expected);
        });
      });
    });
  });
})();
