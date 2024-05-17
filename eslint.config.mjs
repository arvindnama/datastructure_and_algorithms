import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
    {
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'no-sparse-arrays': 'off',
        },
    },
];
