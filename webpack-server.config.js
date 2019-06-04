const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "development",
    target: "node",
    node: {
        __dirname: false,
        __filename: false,
    },
    entry: {
        app: ["./src/main-server.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle-server.js"
    },
    externals: [nodeExternals({
        whitelist: ['express*', 'websocket*']
    })],
    watch: true,
};
