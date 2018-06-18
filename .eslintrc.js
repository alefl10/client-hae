module.exports = {
  "extends": ["airbnb", "plugin:react/recommended"],
  "rules": {
    "parser": 'babel-eslint',
    "no-console": 0,
    "import/no-dynamic-require": 0,
    "func-names": ["error", "never"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "parser": 'babel-eslint',
    "arrow-body-style": ["error", "as-needed", { "requireReturnForObjectLiteral": true }]
  },
};
