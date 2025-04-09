const path = require('path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  // Run ESLint on all staged JS/TS/TSX files
  "*.{js,ts,tsx}": ["eslint --fix"]
};
