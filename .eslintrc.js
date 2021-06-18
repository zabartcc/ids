module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "vue-eslint-parser",
  plugins: ['@typescript-eslint'],
  parserOptions: { // OPTIONS SPECIFIC TO @TYPESCRIPT-ESLINT/PARSER
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['vue'],
    ecmaVersion: 2020,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
  overrides: [{
    files: ['**/*.ts', '**/*.vue'],
    rules: { // USE THIS FOR SPECIFYING RULES SINCE IT'S READ BY BOTH ESLINT-VUE AND TYPESCRIPT-ESLINT
      'no-unused-vars': 'off',
      'no-undef': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-var-required': 'off',
      '@typescript-eslint/no-var-requires': 'off'
    }
  }]
}
