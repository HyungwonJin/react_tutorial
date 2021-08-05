const path = require("path");

module.exports = {
    name: 'wordrelay-setting', // 그냥 이름
    mode: 'development', // 실시간 서비스로 출시할 때는 production으로 바꿔야함
    devtool: 'eval', // 빠른 모드라는 뜻
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    entry: {
        app: ['./client'],
    },

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            }
        }]
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }
}