const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#00beeb',
              '@height-base': '48px',
              '@border-radius-base': '4px',
              '@btn-font-weight': 500,
            },
            javascriptEnabled: true,
          },
        },
        modifyLessRule: (lessRule, _context) => {
          lessRule.use = lessRule.use.filter((i) => !i.loader.includes('resolve-url-loader'));
          return lessRule;
        },
      },
    },
  ],
};
