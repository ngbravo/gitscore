import {assert} from 'chai';
import {getMinScore, getMaxScore, getScore}
  from '../../app/scripts.babel/lib/score';
import 'babel-polyfill';

(function() {
  'use strict';

  describe('Score', function() {
    describe('getMaxScore', function() {
      it('should be higher than max score', function() {
        assert.isAbove(getMaxScore(), getMinScore());
      });
    });
    describe('getMinScore', function() {
      it('should not be negative', function() {
        assert.isAtLeast(getMinScore(), 0);
      });
    });
    describe('getScore', function() {
      it('should have all its elements as numbers', function() {
        let fields = ['aggregate'];
        let score = getScore('ngbravo', 'gitscore');
        for (let i = 0; i < fields.length; i++) {
          const field = fields[i];
          assert.property(score, field);
          assert.isNotNaN(score[field]);
        }
      });
    });
  });
})();
