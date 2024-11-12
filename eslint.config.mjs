import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tsEslint from 'typescript-eslint'


export default tsEslint.config({
  files: ['**/*.{ts,tsx,js,jsx}'],
  ignores: ['assets', 'node_modules', 'dist', 'public'],
  extends: [
    js.configs.recommended,
    ...tsEslint.configs.recommended
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react': react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-empty': 'off',
    'prefer-rest-params': 'off',
    'prefer-const': 'warn',
    'indent': ['warn', 4],
    'max-len': ['warn', { code: 200 }],
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-children-prop': 'off',
  },
});
