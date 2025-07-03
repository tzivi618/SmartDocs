import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/', 'dist/', 'build/', '*.min.js'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      semi: ['error', 'always'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      quotes: ['error', 'single'],
      'require-await': 'error',
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'prettier/prettier': 'error',
    },
  },
];
