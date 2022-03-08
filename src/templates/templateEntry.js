const path = require('path');
// template entires for webpack

const entry = {
  // template name: bottom plus, template a
  'bottom-plus-template-a': [
    path.resolve(__dirname, './bottom-plus/template-a/index.js'),
    path.resolve(__dirname, './bottom-plus/template-a/index.scss'),
  ],
};

module.exports = entry;
