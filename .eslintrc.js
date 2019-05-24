module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ['standard', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint'
    // parser: 'esprima',
    // ecmaFeatures: {
    //   destructuring: true
    // }
  },
  rules: {
    indent: ['error', 2],
    'linebreak-style': 0,
    semi: ['error', 'never'], // 不使用分号
    'no-console': 0,
    'generator-star-spacing': 'off', // allow async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
    'no-return-await': 0,
    quotes: [2, 'single'], // 单引号
    'no-console': 0, // 不禁用console
    'no-var': 0, // 对var警告
    'one-var': 1, // 连续声明
    'no-irregular-whitespace': 0, // 不规则的空白不允许
    'no-trailing-spaces': 1, // 一行结束后面有空格就发出警告
    'eol-last': 0, // 文件以单一的换行符结束
    'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], // 不能有声明后未被使用的变量或参数
    'no-underscore-dangle': 0, // 标识符不能以_开头或结尾
    'no-alert': 2, // 禁止使用alert confirm prompt
    'no-lone-blocks': 0, // 禁止不必要的嵌套块
    'no-class-assign': 2, // 禁止给类赋值
    'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
    'no-const-assign': 2, // 禁止修改const声明的变量
    'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
    'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复
    'no-duplicate-case': 2, // switch中的case标签不能重复
    'no-dupe-args': 2, // 函数参数不能重复
    'no-empty': 2, // 块语句中的内容不能为空
    'no-func-assign': 2, // 禁止重复的函数声明
    'no-invalid-this': 0, // 禁止无效的this，只能用在构造器，类，对象字面量
    'no-redeclare': 2, // 禁止重复声明变量
    'space-before-function-paren': [2, 'never'], // 函数定义时括号前面要不要有空格
    'no-this-before-super': 0, // 在调用super()之前不能使用this或super
    'no-undef': 2, // 不能有未定义的变量
    'no-use-before-define': 2, // 未定义前不能使用
    camelcase: 0, // 强制驼峰法命名
    'jsx-quotes': [2, 'prefer-double'], // 强制在JSX属性（jsx-quotes）中一致使用双引号
    'no-extra-boolean-cast': 0, // 禁止不必要的bool转换
    'no-unreachable': 1, // 不能有无法执行的代码
    'comma-dangle': 2, // 对象字面量项尾不能有逗号
    'no-mixed-spaces-and-tabs': 0, // 禁止混用tab和空格
    'prefer-arrow-callback': 0, // 比较喜欢箭头回调
    'arrow-parens': 0, // 箭头函数用小括号括起来
    'arrow-spacing': 0, // =>的前/后括号
    'no-parsing-error': 0
  }
}
