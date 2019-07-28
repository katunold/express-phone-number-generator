module.exports = {
    "env": {
        "browser": false,
        "es6": true,
        "node": true,
        "mocha": true
    },
    "globals": {
        "document": false,
        "navigator": false,
        "window": false
    },
    "extends": [
      "prettier",
      "airbnb-base"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "rules": {
        "indent": [2, "tab", { "SwitchCase": 1 }],
        "max-len": [2, { "code": 100, "ignoreUrls": true }],
        "no-tabs": "off",
        "comma-dangle": [2, "never"],
        "comma-spacing": [2, { "before": false, "after": true }],
        "no-underscore-dangle": "off",
        "no-param-reassign": "off",
        "no-plusplus": "off",
        "no-bitwise": "off"
    }
};
