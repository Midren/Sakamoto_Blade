const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = [
  {
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
              loader: "ttf-loader",
              options: {
                name: "./font/[hash].[ext]"
              }
            }
          ]
        }
      ]
    }
  },
  {
    mode: "development",
    target: "node",
    node: {
      __dirname: false,
      __filename: false
    },
    entry: {
      app: ["./src/main-server.js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle-server.js"
    },
    externals: [
      nodeExternals({
        whitelist: ["express*", "websocket*"]
      })
    ]
    // watch: true,
  }
];
