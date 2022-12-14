const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { argv } = require("process");

const config = {
  entry: "./src/js/main.js",

  target: "web",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: {
      app: {
        name: "chrome",
      },
    },
    port: 3000,
    watchFiles: "./src/scss/**/*.scss",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },

      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval-source-map";
  }

  if (argv.mode === "production") {
    config.devtool = "source-map";
  }

  return config;
};
