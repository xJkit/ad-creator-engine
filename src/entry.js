const path = require('path');
// template entires for webpack

const entry = {
  parent: {
    import: path.resolve(__dirname, './parent.js'),
    filename: 'parent.js',
  },
  // template name: bottom plus, template a
  'bottom-plus-template-a': path.resolve(__dirname, './templates/bottom-plus/template-a'),
};

module.exports = entry;
