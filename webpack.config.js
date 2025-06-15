const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      main: './src/js/index.js',
      articel: './src/js/articel.js',
      stunting: './src/js/stunting.js'
    },
      output: {
      path: path.resolve(__dirname, 'static/dist'),
      filename: 'js/[name].js',
      publicPath: '/static/dist/',
      clean: true
    },
    
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ]
        },
        {          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext]'
          }
        }
      ]
    },
      plugins: [
      new CleanWebpackPlugin(),
      
      new MiniCssExtractPlugin({
        filename: 'css/[name].css'
      }),
      
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'static/img',
            to: 'img'
          }
        ]
      })
    ],
    
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },    devServer: {
      static: {
        directory: path.join(__dirname, 'static/dist')
      },
      compress: true,
      port: 3000,
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/': {
          target: 'http://localhost:5000',
          secure: false,
          changeOrigin: true,
          bypass: function (req, res, proxyOptions) {
            // Only proxy API requests and templates to Flask
            if (req.url.startsWith('/static/dist/') || 
                req.url === '/favicon.ico' ||
                (req.headers.accept && req.headers.accept.indexOf('html') !== -1 && 
                 !req.url.startsWith('/templates/') && 
                 !req.url.startsWith('/api/'))) {
              console.log('Serving from webpack: ', req.url);
              return req.url;
            }
            console.log('Proxying to Flask: ', req.url);
          }
        }
      },
      // Show more detailed error logs
      devMiddleware: {
        stats: 'errors-warnings',
      },
      // Don't open browser automatically
      open: false
    },
    
    resolve: {
      extensions: ['.js', '.css']
    }
  };
};
