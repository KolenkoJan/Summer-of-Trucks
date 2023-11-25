module.exports = {
    mode: "development",
    entry: ["./src/main.tsx"],
    module: {
        rules: require("./webpack.rules"),
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        publicPath: "/",
        environment: {
            dynamicImport: true,
        },
    },
    target: "web",
    plugins: require("./webpack.plugins"),
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
        alias: require("./webpack.aliases"),
    },
    stats: "errors-warnings",
    devtool: "cheap-module-source-map",
    devServer: {
        open: true,
        historyApiFallback: true,
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
    },
    performance: {
        hints: false,
    },
}
