/**
 * Created by LevshitsVV on 05.08.2016.
 */
import path from 'path';
import webpack from 'webpack';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const ENTRY_POINT = './src/app.js';

const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
};

const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
];

const config = {
    cache: DEBUG,
    debug: DEBUG,

    entry: ENTRY_POINT,

    output: {
        path: path.join(__dirname, '../build/public'),
        filename: 'app.js'
    },
    devtool: DEBUG ? 'source-map' : false,
    stats: {
        colors: true,
        reasons: DEBUG,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE
    },
    resolve:{
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.DedupePlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                loader: 'babel'
            },{
                test: /\.less$/,
                loaders:[
                    'isomorphic-style-loader',
                    `css-loader?${DEBUG ? 'sourceMap&' : 'minimize&'}modules&localIdentName=` +
                    `${DEBUG ? '[local]' : '[local]'}`,
                    'postcss-loader?parser=postcss-less',
                ]
            }, {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
                loader: 'url-loader?limit=10000',
            },{
                test: /\.(eot|ttf|wav|mp3)$/,
                loader: 'file-loader',
            }
        ]
    },
    postcss: function plugins(bundler) {
        return [
            require('postcss-import')({ addDependencyTo: bundler }),
            require('precss')(),
            require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
        ];
    },
};

if(!DEBUG){
    config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

export default config;
