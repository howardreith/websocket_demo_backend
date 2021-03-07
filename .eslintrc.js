module.exports = {
  env: {
    node: true,
    browser: false,
    es6: true,
    'jest/globals': true,
    jest: true,
  },
  extends: 'airbnb-base',
  plugins: ['jest'],
  rules: {
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
};
