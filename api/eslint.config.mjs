import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-console': 'warn', // Warn for console logs
      'eqeqeq': ['error', 'always'], // Always use === and !==
      'semi': ['error', 'always'], // Enforce semicolons
      'quotes': ['error', 'single'], // Enforce single quotes
      'indent': ['error', 2], // Indent using 2 spaces
      'curly': 'error', // Require curly braces for control statements
      'no-unused-vars': ['warn'], // Warn on unused variables
      'consistent-return': 'error', // Enforce consistent return statements
      'no-undef': 'error', // Disallow the use of undeclared variables
      'arrow-parens': ['error', 'always'], // Require parentheses around arrow function arguments
      'object-curly-spacing': ['error', 'always'], // Require spacing inside curly braces
      'array-bracket-spacing': ['error', 'never'], // Disallow spaces inside array brackets
      'no-multiple-empty-lines': ['error', { max: 1 }], // Limit consecutive empty lines
      'max-len': ['error', { code: 120 }], // Maximum line length
      'camelcase': 'error', // Enforce camelCase naming convention
      'prefer-const': 'error', // Prefer const for variables that are never reassigned
      'complexity': ['warn', { max: 10 }], // Limit complexity of functions
      'handle-callback-err': 'error', // Require error handling in callbacks
      'no-eval': 'error', // Disallow eval()
      'no-new-func': 'error', // Disallow new Function()
    },
  },
];
