const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production', // production은 코드를 압축하고, development는 코드를 압축하지 않는다.
    entry: './scripts/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/, // .js 확장자로 끝나는 모든 파일
                exclude: /node_modules/, // node_modules 폴더는 제외
                use: {
                    loader: 'babel-loader', // babel-loader를 사용한다 -> .babelrc 파일을 참조
                    options: {
                        presets: ['@babel/preset-env'] // babel의 preset인 @babel/preset-env를 사용한다
                    }
                }
            }
        ]
    },
    optimization: {
        minimize: true, // 코드를 압축한다
        minimizer: [new TerserPlugin(
            {
                terserOptions: {
                    compress: {
                        drop_console: true, // 콘솔 로그를 제거한다
                    }
                }
            }
        )] // TerserPlugin을 사용해 코드를 압축한다
    }
}