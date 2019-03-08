module.exports = {
  "linters": {
    "*.min.*": [
      "git add",
    ],
    "*.babel.js": [
      "yarn .babel --",
      "yarn prettier --write",
      "yarn eslint --fix",
      "yarn eslint",
      "git add",
    ],
    "**/scripts/**/*.js": [
      "git add",
    ],
    "*.js": [
      "yarn prettier --write",
      "yarn eslint --fix",
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
    ".*{rc,json}": [
      "yarn jsonlint",
      "git add",
    ],
  },
  "ignore": [
    "**/dist/*.js",
  ],
};
