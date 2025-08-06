import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      node: true,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Ensure missing imports or undefined hooks throw errors
      'no-undef': 'error', // Undefined variables, including hooks
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

      // Strict rules for more visible errors
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'none', ignoreRestSiblings: false },
      ],
      'no-undef': 'error', //
      'no-unused-let': 'error', //
      'no-unused-const': 'error',
      'eslint.run': 'onType', // Run ESLint on type to catch errors faster
      'eslint.validate': [
        'javascript',
        'javascriptreact',
        'typescript',
        'typescriptreact',
      ],
      'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true,
      },
      'eslint.codeActionsOnSave.mode': 'all',
    },
  },
];
