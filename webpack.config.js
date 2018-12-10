const { argv } = require('yargs');
const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');

const devMode = argv.mode == 'development';

const paths = {
	prod: path.join(__dirname, '/build')
}

const config = {
	entry: './src/index.js',

	output: {
		path: paths.prod,
		publicPath: '/',
		filename: devMode ? '[name].js' : 'js/[name].[hash].js',
		chunkFilename: devMode ? '[name].js' : 'js/[name].[hash].js'
	},

	resolve: {
    extensions: ['.js', '.sass', '.css', 'scss']
  },

	optimization: {
		splitChunks: {
			chunks: 'all',
			name: 'main',
			minChunks: 4
		}
	},

	module: {
		rules: [
			{
				test: /\.js(x)?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						plugins: devMode ? ['react-hot-loader/babel'] : undefined
					}
				}
			},
			{
				test: /\.(c|sa|sc)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers: ['> 1%', 'last 4 versions'],
								})
							]
						}
					},
					{
						loader: 'sass-loader',
            options: {
              includePaths: ['node_modules', 'node_modules/@material/*']
                .map((d) => path.join(__dirname, d))
                .map((g) => glob.sync(g))
                .reduce((a, c) => a.concat(c), [])
            }
          }
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "babel-loader"
					},
					{
						loader: "react-svg-loader",
						options: {
							jsx: true // true outputs JSX tags
						}
					}
				]
			},
			{
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
						name: 'other/img/[name].[ext]',
            // limit: 100000,
          },
        },
			},

			{
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
						name: 'other/fonts/[name].[ext]',
						publicPath: '/'
            // limit: 100000,
          },
        },
			},

			// {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader'
  	  // }
		]
	},

	plugins: [

		new HtmlWebpackPlugin({
			template: './public/index.html',
			minify: {
				collapseWhitespace: true,
			}
		}),
		new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : 'css/[id].[hash].css',
		}),
		devMode ? () => {} : new CleanWebpackPlugin(paths.prod),
		new OptimizeCSSAssetsPlugin()
		
	],

	devServer: {
		proxy: [{
				path: '/api/',
				target: 'http://localhost:3030'
		}],
		historyApiFallback: {
      disableDotRule: true
    }
	}
}

module.exports = (env, options) => {
	return config;
}