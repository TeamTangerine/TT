import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
// import watermarkPlugin from './src/plugins/watermark-plugin';
import tsCheckerForJunior from './src/plugins/tsCheckerForJunior';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // watermark: watermarkPlugin,
      tsCheckerForJunior: tsCheckerForJunior,
      tailwindcss: tailwindcss,
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'warn',
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // 주요 실수 방지 커스텀 룰은 logicChecker 플러그인에서 처리
      'tsCheckerForJunior/no-explicit-any': 'error',
      'tsCheckerForJunior/no-props-type': 'warn',
      'tsCheckerForJunior/no-ts-ignore': 'warn',
      'tsCheckerForJunior/no-hooks-type': 'warn',
      'tsCheckerForJunior/no-array-mutation': 'error',
      'tsCheckerForJunior/no-usestate-type': 'warn',
      'tsCheckerForJunior/no-effect-deps-object': 'warn',
      'tsCheckerForJunior/no-useref-type': 'warn',
      'tsCheckerForJunior/no-array-method-unused': 'warn',
      'tsCheckerForJunior/no-event-handler-inline': 'warn',
      // 공식 룰 병행 적용
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/no-direct-mutation-state': 'error',
      'react/no-multi-comp': ['warn', { ignoreStateless: true }],
      'react/jsx-key': 'warn',
      'react-hooks/exhaustive-deps': 'warn',
  'react/jsx-pascal-case': 'error',
    },
  }
);
