const path = require("path");

module.exports = {
    mode: "development",
    target: "web",
    entry: "./src/main-client.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle-client.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|svg)$/,
                use: ["url-loader"]
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'ttf-loader',
                        options: {
                            name: './font/[hash].[ext]',
                        },
                    },
                ]
            },
        ],

    },
    watch: true
};
