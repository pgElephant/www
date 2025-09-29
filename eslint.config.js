const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: true,
});

module.exports = [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "*.config.js"],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "warn", // Make this a warning instead of error
    },
  },
];