module.exports = {
  "linters": {
    "*.min.*": [
      "git add",
    ],
    "*.babel.js": [
      "yarn babel",
      "yarn prettier",
      "yarn eslint",
      "git add",
    ],
    "*.js": [
      "yarn prettier",
      "yarn eslint",
      "git add",
    ],
    "package.json": [
      "yarn fixpack",
      "git add",
    ],
    "*.{json,yml}": [
      "git add",
    ],
    "*.{md}": [
      "git add",
    ],
  },
  "ignore": [
    "**/dist/*.js",
  ],
};
