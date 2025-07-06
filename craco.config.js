module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add the following lines to handle 'crypto' and 'fs' dependencies
      webpackConfig.resolve.fallback = {
        fs: false, // or 'empty' if you prefer an empty module
        path: false,
        crypto: false,
      };

      // Add the 'module' configuration for handling .wasm files
      webpackConfig.module.rules.push({
        test: /\.wasm$/,
        type: "javascript/auto",
      });

      return webpackConfig;
    },
  },
};
// check https://github.com/sql-js/react-sqljs-demo
