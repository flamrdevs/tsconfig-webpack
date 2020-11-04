/**
 * tsconfig-webpack
 * convert tsconfig/compilerOptions/paths to webpack.config/module/alias 
 */

const path = require('path');

const tsconfig = require('./tsconfig.json');

const alias = () => {
  // get paths from destructuring tsconfig.json
  const { paths } = tsconfig.compilerOptions

  // ts alias (paths)
  const ts_alias = {};

  for (const [_alias,_path] of Object.entries(paths)) {
    // ts_alias[new_alias] = new_path
    ts_alias[_alias.replace('/*','')] = [..._path.map(__path => path.resolve(__dirname,__path.replace('/*','').replace('*','')))];
  }

  // return ts alias to webpack alias
  return ts_alias;
}

const tsConfigWebpack = {
  alias: alias
}

module.exports = tsConfigWebpack;