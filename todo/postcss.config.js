// CSS cross-browser compatibility
const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: [
        'last 2 versions, not dead, > 0.2%',
        'last 2 Chrome versions',
        'last 2 Safari versions',
        'ie 11'
      ]
    })
  ]
};