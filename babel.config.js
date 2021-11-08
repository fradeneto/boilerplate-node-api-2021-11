const { compilerOptions } = require('./tsconfig.json');

function getPaths() {
  const { paths: tsconfigPaths } = compilerOptions;
  const babelPaths = {};
  for (const [key, value] of Object.entries(tsconfigPaths)) {
    babelPaths[key.substring(0,key.length-2)] = value[0].substring(0, value[0].length-2);
  }
  return babelPaths;
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  sourceType: 'unambiguous',
  plugins: [
    ['babel-plugin-transform-typescript-metadata'],
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": false}],
    ['@babel/plugin-transform-modules-commonjs', {strictMode: false}],
    ['module-resolver', {
      alias: getPaths(),
    }]
  ],
  ignore: [
    '**/*.spec.ts',
    '**/*.test.ts',
    'test/**/*',
    'dist/**/*',
  ]
}