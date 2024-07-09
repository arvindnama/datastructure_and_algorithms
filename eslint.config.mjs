import globals from 'globals';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, '.gitignore');

export default [
    includeIgnoreFile(gitignorePath),
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'no-prototype-builtins': 'off',
            'no-sparse-arrays': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
