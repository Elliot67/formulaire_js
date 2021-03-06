const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    let devServer;

    if (env.MODE == "development") {
        devtool = "cheap-module-eval-source-map";
        mode = "development";
        watch = true;
        filename = "[name].js";
        plugins = [
            new HtmlWebpackPlugin({ // Pour ajouter un autre fichier HTML, simplement créer une nouvelle instance de l'objet - https://dev.to/mariorodeghiero/multiple-html-files-with-htmlwebpackplugin-19bf
                template: "./src/html/connexion.html",
                filename: "connexion.html",
                chunks: ['connexion'],
                inject: true,
            }),
            new HtmlWebpackPlugin({
                template: "./src/html/inscription.html",
                filename: "inscription.html",
                chunks: ['inscription'],
                inject: true,
            }),
        ];
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

    if (env.MODE == 'dev') {
        devtool = "cheap-module-eval-source-map";
        mode = "development";
        watch = true;
        filename = "[name].js";
        plugins = [
            new HtmlWebpackPlugin({
                template: "./src/html/connexion.html",
                filename: "connexion.html",
                chunks: ['connexion'],
                inject: true,
            }),
            new HtmlWebpackPlugin({
                template: "./src/html/inscription.html",
                filename: "inscription.html",
                chunks: ['inscription'],
                inject: true,
            }),
        ];
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
        devServer = {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 8080,
            allowedHosts: [],
        };
    }

    if (env.MODE == 'production') {
        devtool = false;
        mode = "production";
        watch = false;
        filename = "[name]-[contentHash].js";
        plugins = [
            new HtmlWebpackPlugin({
                template: "./src/html/connexion.html",
                filename: "connexion.html",
                chunks: ['connexion'],
                inject: true,
            }),
            new HtmlWebpackPlugin({
                template: "./src/html/inscription.html",
                filename: "inscription.html",
                chunks: ['inscription'],
                inject: true,
            }),
            new MiniCssExtractPlugin({
                filename: "[name]-[hash].css"
            }),
            new CleanWebpackPlugin(),
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
            connexion: ["./src/js/connexion.js", "./src/scss/connexion.scss"],
            inscription: ["./src/js/inscription.js", "./src/scss/inscription.scss"],
            //vendor: "./src/vendor.js" Pour créer un fichier séparé consacré aux librairies
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
                {
                    test: /\.html$/,
                    use: { // Pour importer les fichiers nécessaires
                        loader: "html-loader"
                    }
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                }
            ],
        },
        devServer: devServer,
    }
}