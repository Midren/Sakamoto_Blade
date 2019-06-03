const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "development",
    target: "node",
    entry: {
        app: ["./src/main-server.js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle-server.js"
    },
    externals: [nodeExternals({
        whitelist: ['express']
    })],
    watch: true,
};
