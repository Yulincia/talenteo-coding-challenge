import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // 'semi': ['error', 'always'],
      'quotes': ['error', 'double'],
      'indent': ['error', 2],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
      'no-console': ['warn', { 'allow': ['warn', 'error'] }],
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-multiple-empty-lines': ['error', { 'max': 1 }],
      'no-multi-spaces': ['error'],
      '@typescript-eslint/no-var-requires': 'off',
      'no-tabs': 'off',
      'spaced-comment': 'off',
      'consistent-return': 'off',
      'max-len': ['warn',{ 'code': 180 }],
      'prefer-destructuring': ['error',{ 'object': true, 'array': false }],
      'no-param-reassign': 'off',
      'no-underscore-dangle': 'off',
      'linebreak-style': 'off',
      'no-nested-ternary': 'warn',
      'prefer-const': 'error',
      'no-duplicate-imports': 'error',
      'no-useless-return': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable': 'error',
      'no-shadow': 'warn',
      'no-use-before-define': ['error', { 'functions': false }],
      'consistent-return': 'warn',

      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-arrow-callback': 'error',

    },
  },
])
