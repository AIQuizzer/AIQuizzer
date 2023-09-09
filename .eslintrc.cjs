module.exports = {
  'env': {
    'browser': true,
    'es2022': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/strict',
    'plugin:react/jsx-runtime',
    'eslint-config-async',
    'plugin:import/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  'plugins': [
    'react',
    '@typescript-eslint'
  ],
  'rules': {
    'quotes': [
      'warn',
      'double'
    ],
    'semi': [
      'warn',
      'never'
    ],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    'no-shadow': 'warn',
    'prefer-const': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-magic-numbers': ['error', { ignore: [1, 0, 404, 200, 500] }],
    'no-dupe-else-if': 'error',
    'max-depth': ['error', 4],
    'max-lines': 'warn',
    'max-params': ['error', 3],
    'no-unneeded-ternary': 'error',
    'react/boolean-prop-naming': 'error',
    'react/jsx-max-depth': ['warn', { max: 5 }],
    'import/no-default-export': 'error',
  },
  settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
