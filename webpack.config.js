// const path = require('path');
// const webpack = require('webpack');
// const mockUrl = 'http://test.happymmall.com/';
//
//
// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'index.js',
//     // chunkFilename: [name]/[name].js,
//     path: path.resolve(__dirname, './dist'),
//   },
//   mode: 'development',                             // webapck v4.x 开发环境-development 生产环境-production
//   devServer: {
//     contentBase: path.resolve(__dirname, './src'),
//     hot: true,
//     port: 8080,
//     proxy: {
//       '/v2/*': {
//         target: mockUrl,
//         changeOrigin: true,
//         secure: true,
//       }
//     },
//     historyApiFallback: {
//       rewrites: [
//         { from: /^\/$/, to: '/index.html' }
//       ]
//     }
//   },
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['env', 'react']
//           }
//         },
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.css$/,
//         use: [
//           // process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
//           'style-loader',
//           'css-loader',
//           'postcss-loader',
//         ],
//       },
//       {
//         test: /\.less$/,
//         use: [
//           // process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
//           'style-loader',
//           'css-loader',
//           'postcss-loader',
//           'less-loader',
//         ],
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: 'html-loader',
//             options: { minimize: true }
//           }
//         ]
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/,
//       }
//     ],
//   }
// };


const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.resolve(__dirname, './src');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        // exclude表示对括号里的文件不做处理
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|gif|svg|jpe?g)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[name].[hash:7].[ext]'
            }
          }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(src, 'index.html'),
      filename: 'index.bundle.html',
      // inject: 'body',
      hash: true,
      excludeChunks: ['test.html'],
      favicon: path.resolve(src, 'favicon.ico')
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: 'index.html' },
      ]
    },
    proxy: {
      // '/manage' : {
      //   target : 'http://admintest.happymmall.com',
      //   changeOrigin : true,
      // },
      // '/user/logout.do' : {
      //   target : 'http://admintest.happymmall.com',
      //   changeOrigin : true,
      // },
    }
  },
};
