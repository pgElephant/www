const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const path = require('path');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  // Global ignores (ensure backup snapshots are excluded from lint)
  { ignores: ['.backups/**'] },
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "warn",
    },
    ignores: ['.next/**', 'node_modules/**', 'public/**', '*.config.js'],
  }
];