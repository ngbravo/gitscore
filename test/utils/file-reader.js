'use strict';

let fs = require('fs');

module.exports = {
  readResFile: function(file) {
    const relFilePath = 'test/res/' + file;

    fs.readFile(relFilePath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }
      console.log(data);
      return data;
    });
  },
};
