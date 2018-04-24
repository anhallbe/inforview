const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
	entry: "./src/app.ts",
	output: {
		path: path.resolve("./web/"),
		publicPath: "/",
		filename: "app.js",
	},
	resolve: {
		extensions: [".ts", ".js"],
		alias: {
			"angular-chart": "angular-chart.js",
		}
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: "ts-loader",
			},
		],
	},
	devServer: {
		proxy: {
			"/scb": {
				target: "https://api.scb.se",
				secure: false,
				pathRewrite: {"^/scb": "/OV0104/v1/doris/en/ssd/START"},
				changeOrigin: true,
			}
		}
	},
	devtool: "source-map",
	plugins: [new HtmlWebpackPlugin({
		template: "./src/index.html",
		inject: true,
	})]
}