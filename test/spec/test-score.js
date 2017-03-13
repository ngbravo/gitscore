import {assert} from 'chai';
import _score from '../../app/scripts.babel/github.content/score';
import 'babel-polyfill';

(function() {
  'use strict';

  describe('Score', function() {
    describe('getMaxScore()', function() {
      it('should be higher than max score', function() {
        assert.isAbove(_score.getMaxScore(), _score.getMinScore());
      });
    });
    describe('getMinScore()', function() {
      it('should not be negative', function() {
        assert.isAtLeast(_score.getMinScore(), 0);
      });
    });
    describe('getScore()', function() {
      it('should have all its elements as numbers', function() {
        let fields = ['aggregate'];
        let score = _score.getScore();
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          assert.property(score, field);
          assert.isNotNaN(score[field]);
        }
      });
    });
  });
})();
