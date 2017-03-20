'use strict';

let fs = require('fs');

module.exports = {
  readResFile: function(file) {
    const relFilePath = 'test/res/' + file;

    let data = fs.readFileSync(relFilePath, 'utf8');
    return data;
  },
};
