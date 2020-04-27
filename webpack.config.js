const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {

    // DEFINE VARIABLES
    let devtool;
    let mode;
    let watch;
    let filename;
    let scssModules;
    let plugins;

    if (env.MODE == "development") {
        devtool = "cheap-module-eval-source-map";
        mode = "development";
        watch = true;
        filename = "main.js";
        plugins;
        scssModules = [
            "style-loader", // Inject style js in the DOM
            { // Turns css to js
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            { // Ajouter des prefixes avec autoprefixer (fichier postcss.config.js)
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            { // Turns sass into css
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
        ];
    }

    if (env.MODE == 'production') {
        devtool = false;
        mode = "production";
        watch = false;
        filename = "main.js";
        plugins = [
            new MiniCssExtractPlugin({
                filename: "style.css"
            }),
            new CleanWebpackPlugin()
        ];
        scssModules = [
            MiniCssExtractPlugin.loader, // Create CSS files
            "css-loader",// Turns css to js
            "postcss-loader", // Ajouter des prefixes avec autoprefixer (fichier postcss.config.js)
            "sass-loader" // Turns sass into css
        ];
    }

    console.log('\x1b[1;33m', "--------------------------------------", '\x1b[0m');
    console.log("Running webpack in", '\x1b[1;35m' + env.MODE + '\x1b[0m', "mode");
    console.log('\x1b[1;33m', "--------------------------------------", '\x1b[0m');

    return {
        mode: mode,
        entry: {
            main: ["./src/index.js", "./src/index.scss"]
            //vendor: "./src/vendor.js" Pour créer un fichier séparé consacré au librairies
        },
        devtool: devtool,
        watch: watch,
        output: {
            filename: filename,
            path: path.resolve(__dirname, "dist")
        },
        resolve: {
            alias: {
                '@src': path.resolve('./src/'),
                '@assets': path.resolve('./assets/')
            }
        },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: scssModules
                },
            ]
        }
    }

}