/**
 * tsconfig-webpack
 * convert tsconfig/compilerOptions/paths to webpack.config/module/alias 
 */

const path = require('path');

const tsConfigWebpack = ({ tsConfigPath = './tsconfig.json', webpackConfigBasePath = __dirname } = {}) => {
  // get paths from destructuring tsconfig.json
  const { paths } = require(tsConfigPath).compilerOptions;

  // ts alias (paths)
  const ts_alias = {};

  for (const [_alias,_path] of Object.entries(paths)) {
    // ts_alias[new_alias] = new_path
    ts_alias[_alias.replace('/*','')] = path.resolve(webpackConfigBasePath,_path[0].replace('/*','').replace('*',''));
  }

  // return ts alias to webpack alias
  return ts_alias;
}

module.exports = tsConfigWebpack;