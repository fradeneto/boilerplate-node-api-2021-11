/* eslint-disable import/no-dynamic-require */
const { resolve } = require('path');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('../tsconfig.json');

const { paths } = compilerOptions;

const root = resolve(__dirname, '..');
const rootConfig = require(`${root}/jest.config.js`);

module.exports = {
  ...rootConfig,
  ...{
    rootDir: root,
    displayName: 'end2end-tests',
    setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
    testMatch: ['<rootDir>/test/**/*.test.ts'],
    moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>' }),
  },
};
