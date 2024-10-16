import js from '@eslint/js'
import eslintPluginVue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...eslintPluginVue.configs['flat/recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": [
        "warn",
        {
          "arrowParens": "always",
          "semi": true,
          "trailingComma": "none",
          "tabWidth": 2,
          "endOfLine": "auto",
          "useTabs": false,
          "singleQuote": true,
          "printWidth": 120,
          "jsxSingleQuote": true
        }
      ]
    }
  }
)