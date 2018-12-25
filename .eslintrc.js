module.exports = {
    "extends": "airbnb",
    "globals": {
      "after": false,
      "afterEach": false,
      "before": false,
      "beforeEach": false,
      "describe": false,
      "document": false,
      "it": false,
      "window": false
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "comma-dangle": 0,
      "consistent-return": 0,
      "react/jsx-filename-extension": 0,
      "no-underscore-dangle": 0,
      "no-console": 1
    }
};
