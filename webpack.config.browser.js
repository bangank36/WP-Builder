/**
 * External dependencies
 */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreventBrowserOpenPlugin = require('./prevent-browser-open-plugin');

module.exports = {
  mode: 'production',
  entry: {
    'wp-builder': './src/browser/index.js',
    'core': './src/browser/core.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build-browser'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss|\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      // Handle images and fonts
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  // React and ReactDOM are bundled (not external) for standalone usage
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // Add aliases if needed for resolving paths
      '@components': path.resolve(__dirname, 'src/js/components'),
      '@renderers': path.resolve(__dirname, 'src/js/renderers'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    // Provide global variables for libraries that expect them
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
    // Prevent browser from opening automatically
    new PreventBrowserOpenPlugin(),
  ],
  // Optimization settings
  optimization: {
    splitChunks: {
      cacheGroups: {
        // Extract WordPress components into a separate file
        wordpress: {
          test: /[\\/]node_modules[\\/]@wordpress/,
          name: 'wordpress-components',
          chunks: 'all',
        },
      },
    },
  },
};
