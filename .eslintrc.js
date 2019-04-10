module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/prettier'
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "parser": 'babel-eslint'
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};