const postcssImport = require('postcss-import');
const nesting = require('postcss-nesting');
const autoprefixer = require('autoprefixer');
const csswring = require('csswring');

module.exports = {
  plugins: [
    postcssImport(),
    nesting(),
    autoprefixer({
      browsers: [
        'last 2 versions',
        'not ie <= 11',
        'not ie_mob <= 11',
      ],
    }),
    csswring(),
  ],
};
