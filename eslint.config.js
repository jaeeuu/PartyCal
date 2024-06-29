import js from "@eslint/js";
import plugin from 'eslint-plugin-solid';
import * as tsParser from "@typescript-eslint/parser";
import stylex from "@stylexjs/eslint-plugin";
import globals from "globals";

export default [
  {
    files: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.jsx"],
    ignores: [".git/**", "dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  plugin.configs['flat/typescript'],
  {
    plugins: {
      "@stylexjs": stylex,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    rules: {
      //indent: ["warn", 2],
      "semi": ["warn", "always"],
      "solid/reactivity": "warn",
      "solid/no-destructure": "warn",
      "no-unused-vars": "warn",
      "@stylexjs/valid-styles": [
        "error",
        {
          "propLimits": {
            "animation": {
              "limit": "string",
              "reason": ""
            },
          }
        }
      ]
    }
  }
];