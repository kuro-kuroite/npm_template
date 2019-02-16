module.exports = {
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'import/no-unresolved': 'warn',
    // HACK: add trailingComma all in .prettierrc.js
    'comma-dangle': ['error', 'always-multiline'],
    'prettier/prettier': 'error',
  },
  parser: 'babel-eslint',
  plugins: ['prettier'],
};
