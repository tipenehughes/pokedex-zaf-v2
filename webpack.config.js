const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // the output bundle won't be optimized for production but suitable for development
    mode: "development",
    // the app entry point is /src/index.js
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
        // the output of the webpack build will be in /assets directory
        path: path.resolve(__dirname, "dist", "assets"),
        // the filename of the JS bundle will be bundle.js
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                // for any file with a suffix of js or jsx
                test: /\.jsx?$/,
                // ignore transpiling JavaScript from node_modules as it should be that state
                exclude: /node_modules/,
                // use the babel-loader for transpiling JavaScript to a suitable format
                loader: "babel-loader",
                options: {
                    // attach the presets to the loader (most projects use .babelrc file instead)
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                },
            },
            {
                test: /\.(s*)css$/,
                use: [
                    {
                        loader: "style-loader", // Creates style nodes from JS strings.
                    },
                    {
                        loader: "css-loader", // Translates CSS into CommonJS.
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader", // Compiles Sass to CSS.
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                loader: "svg-inline-loader",
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    // add a custom iframe.html as the template
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/iframe.html",
            filename: "iframe.html",
        }),
    ],
};
