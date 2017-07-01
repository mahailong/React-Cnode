
const path = require('path');
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),
  path.resolve(__dirname, 'src/assets/svg'), 
];

export default {
  // ...
  svgSpriteLoaderDirs: svgSpriteDirs,
  //...
}
