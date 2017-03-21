import {assert} from 'chai';
import {tryWriteScore} from '../../app/scripts.babel/lib/modify-github-webpage';
import {getMinScore, getMaxScore} from '../../app/scripts.babel/lib/score';
import jsdom from 'jsdom-global';
import {readResFile} from './../utils/file-reader';

const testScores = {
  high: {
    aggregate: getMaxScore(),
  },
  medium: {
    aggregate: getMinScore() +
      (getMinScore() + getMaxScore()) / 2,
  },
  low: {
    aggregate: getMinScore(),
  },
  invalid: {
    aggregate: getMinScore() - 1,
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

          tryWriteScore(testScores.medium);

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

          tryWriteScore(score);

          let scoreBox = document.getElementById('score-box');

          // assert the score was properly written
          assert.equal(classTest.score.aggregate, scoreBox.innerHTML);

          // assert the score's class is OK
          assert.equal(scoreBox.className, classTest.expected);
        });
      });

      it('should not try and write score in invalid HTML', function() {
        document.body.innerHTML = 'this is invalid';
        assert.isFalse(tryWriteScore(testScores.medium));
      });

      it('should write only one score', function() {
        assert.isTrue(tryWriteScore(testScores.medium));
        assert.isFalse(tryWriteScore(testScores.medium));
      });
    });
  });
})();
