const path = require('path')

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, './src/public'),
        publicPath: './src/public',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
};

new webpack.DefinePlugin({
    '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
  });