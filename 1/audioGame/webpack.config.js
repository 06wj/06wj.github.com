const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = function(env, argv) {
	const isDev = !!env;
	const mode = isDev ? 'development' : 'production';

	console.log(`webpack-mode:${mode}`);

	const devtool = isDev ? 'none' : 'none';

	const plugins = [new webpack.DefinePlugin({
		SHADER_COMPILER_VERSION: JSON.stringify(pkg.version)
	})];

	if (!isDev) {
		plugins.push(new UglifyJSPlugin())
	}

	return {
		entry: {
			'index': './src/index'
		},

		mode: mode,

		output: {
			filename: 'build/index.js',
			path: path.resolve(__dirname, '')
		},

		module: {
			rules: [{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /(node_modules|bower_components|lib)/,
				use: {
					loader: 'eslint-loader'
				}
			}, {
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['@babel/preset-env']
				}
			}]
		},

		plugins: plugins,
		devtool: devtool

	}
};