/**
 * Created by ouyang on 2018/10/8.
 */
console.log('process.env.NODE_ENV', process.env.NODE_ENV)
// vue.config.js
module.exports = {
    // 部署应用包时的基本 URL  Default: '/'
    baseUrl: process.env.NODE_ENV === 'production' ? './' : './',
    // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
    outputDir: 'dist/ques',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录  Default: ''
    assetsDir: 'assets',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    filenameHashing: true,
    devServer: {
        host: '0.0.0.0',
        port: 9001,
        hot: true,          // 开启热更新
        overlay: true,      // 开启报错提示显示在浏览器遮罩层
        // historyApiFallback: true   // 设置vue-router的模式是histroy
        /* proxy: {
            '/api': {
                target: '<url>',
                ws: true,
                changeOrigin: true
            },
            '/foo': {
                target: '<other_url>'
            }
        } */
    },
    // multi-page 模式
    // pages: undefined,
    pages: {
        index: {
            // page 的入口
            entry: 'src/views/index/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
        card: {
            // page 的入口
            entry: 'src/views/card/main.js',
            // 模板来源
            template: 'public/card.html',
            // 在 dist/index.html 的输出
            filename: 'card.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '贺卡',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'card']
        }
    },
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: true,
    configureWebpack: {
        performance: {
            hints: "warning", // 枚举
            maxAssetSize: 10000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 20000000, // 整数类型（以字节为单位）
            assetFilter: function(assetFilename) {
                // 提供资源文件名的断言函数
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        }
    }
};