const path = require('path');
const Config = require('./config');

const moduleResolverConfig = {
  root: path.resolve('./'),
  alias: {
    '@kitten/theme': path.resolve(Config.KITTEN_PATH, 'theme'),
    '@kitten/ui': path.resolve(Config.KITTEN_PATH, 'ui'),
    '@eva-design/eva': path.resolve(Config.MAPPING_PATH),
    '@eva-design/processor': path.resolve(Config.PROCESSOR_PATH),
  },
};

module.exports = function (api) {
  api.cache(true);

  const presets = [
    'babel-preset-expo',
  ];

  const plugins = [
    ['module-resolver', moduleResolverConfig],
  ];

  return { presets, plugins };
};
