module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'prettier',
  ],
  plugins: ['react', 'unused-imports'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
    'import/order': ['error', { 'newlines-between': 'always' }],
  },
  settings: {
    react: { version: 'detect' },
  },
};
