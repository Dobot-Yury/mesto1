const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
	entry: './src/pages/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		compress: true,
		port: 8000,
	},
	module:{
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use:[
					MiniCssExtractPlugin.loader, {
					loader: 'css-loader',
					options: { importLoaders: 1 }
				  },
				'postcss-loader']
			},
			{
				// регулярное выражение, которое ищет все файлы с такими расширениями
				test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
				type: 'asset/resource'
			  }
		]
	},
	mode: "development",
	plugins:[
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname,'src','index.html')
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
	]
};