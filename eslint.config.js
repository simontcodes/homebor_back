import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import path from 'path';

const __dirname = path.resolve();

export default tseslint.config(
  {
    ignores: ['eslint.config.js'],
  },
  // ESLint core recommended
  eslint.configs.recommended,
  // TS recommended (type-checked)
  ...tseslint.configs.recommendedTypeChecked,
  // Prettier plugin preset (enables prettier/prettier rule)
  eslintPluginPrettierRecommended,

  // Language options
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
        tsconfigRootDir: __dirname,
      },
    },
  },

  // Your rules + Prettier rule override
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // 👇 Your Prettier setting
      'prettier/prettier': ['error', { endOfLine: 'lf' }],
      // If you're on Windows and keep seeing "Delete ␍", switch to:
      // 'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },

  // ✅ DTO-only override to silence decorator false-positives
  {
    files: ['**/*.dto.ts', '**/dto/**/*.ts'],
    rules: {
      '@typescript-eslint/no-unsafe-call': 'off',
      // These two are rarely flagged, but safe to relax for DTOs if needed:
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
);
