module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    "object-curly-newline": "off",
    "react/jsx-filename-extension": "off",
    "no-use-before-define": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-unused-vars": "off"
  },
};
