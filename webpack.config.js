const path = require('path');
const PROJECT_OUTPUT = path.resolve(__dirname, './dist');
module.exports = {
	mode: 'development',
	entry: './index.js',
	resolve: {
		//modules: ['../node_modules'],
		extensions: ['.ts','.js']
	},
	output: {
		path: PROJECT_OUTPUT,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{test: /\.ts$/, loader:'ts-loader'}
		]
	},
	devServer: {
		proxy: {
			'/rosreestr': {
				target: 'https://rosreestr.ru',
				pathRewrite: {'^/rosreestr' : ''},
				changeOrigin: true,
				secure: false
			}
		},
		contentBase: PROJECT_OUTPUT,
		compress: true,
		port: 9000
	}
};