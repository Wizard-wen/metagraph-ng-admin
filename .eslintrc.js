module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    createDefaultProgram: true
  },
  plugins: ['@typescript-eslint', '@angular-eslint'],
  env: {
    es6: true,
    node: true
  },
  extends: ['airbnb-typescript/base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    sessionStorage: true,
    window: true
  },
  rules: {
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
      }
    ],
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: false,
        skipComments: false
      }
    ],
    'max-len': [
      1,
      150,
      2,
      {
        ignorePattern: '^import\\s.+\\sfrom\\s.+;$',
        ignoreUrls: true
      }
    ],
    'global-require': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 0,
    // to adapt mongoose's _id property
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'comma-dangle': ['error', 'never'],
    // todo: 临时添加，需要修复
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-shadow': 'off'
  }
};
