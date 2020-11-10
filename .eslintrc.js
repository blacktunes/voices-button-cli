module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
