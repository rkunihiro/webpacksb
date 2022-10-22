const { resolve } = require("node:path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/** @type {import("webpack").Configuration} */
module.exports = {
    mode: "production",
    entry: {
        main: resolve(__dirname, "./src/main.tsx"),
    },
    output: {
        path: resolve(__dirname, "./dist"),
        filename: "asset/[contenthash].js",
    },
    devtool: "source-map",
    module: {
        rules: [
            //
            {
                test: /\.tsx?$/,
                loader: "esbuild-loader",
                /** @type {import("esbuild-loader/dist/interfaces").LoaderOptions} */
                options: {
                    loader: "tsx",
                    platform: "browser",
                    target: ["chrome96", "ios15", "safari15"],
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    //
                    { loader: MiniCssExtractPlugin.loader },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        /** @type {import("sass-loader").Options} */
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                },
            },
        },
    },
    performance: {
        maxAssetSize: 512 * 1024,
        maxEntrypointSize: 512 * 1024,
    },
    plugins: [
        // index.html
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "head",
            xhtml: true,
            publicPath: "/",
        }),
        new MiniCssExtractPlugin({
            filename: "asset/[contenthash].css",
        }),
    ],

    devServer: {
        port: 8000,
        hot: true,
    },
};
