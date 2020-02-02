module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  extends: [
    "eslint:recommended",
    "@nuxtjs/eslint-config-typescript",
    "plugin:vue/recommended"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "space-before-function-paren": ["error", "never"],
    semi: ["error", "always"],
    "eol-last": 0,
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    quotes: ["error", "double"],
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off"
  }
};
