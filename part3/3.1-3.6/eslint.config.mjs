import globals from "globals";
import pluginJs from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import stylisticJsPlugin from "eslint-plugin-stylistic";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
      ecmaVersion: 12,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: {
      stylistic: stylisticJsPlugin,
      react: reactPlugin,
    },
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/linebreak-style": ["error", "unix"],
      "stylistic/quotes": ["error", "single"],
      "stylistic/semi": ["error", "never"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": 0,
    },
  },
  {
    files: ["*.jsx", "*.js"],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
  },
  {
    ignores: ["dist/"],
  },
];
