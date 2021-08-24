/*
 *  ESLint run control for speed-date project.
 *  Created On 24 August 2021
 */

module.exports = {
  env: {
    es2021: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
