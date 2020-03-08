module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    lintOnSave: false, //是否开启eslint
    // outputDir: 'dist', //build输出目录
    // assetsDir: 'assets', //静态资源目录（js, css, img）
    // devServer: {
    //     open: false, //是否自动弹出浏览器页面
    //     host: 'localhost',
    //     port: '8080',
    //     https: false, //是否使用https协议
    //     hotOnly: true, //是否开启热更新
    //     // proxy: null,
    //     proxy: {
    //         '/api': {
    //             target: 'https://lab.isaaclin.cn/nCoV', //API服务器的地址
    //             ws: true, //代理websockets
    //             changeOrigin: true, // 虚拟的站点需要更管origin
    //             pathRewrite: {
    //                 //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
    //                 '^/api': '',
    //             },
    //         },
    //     },
    // },
}
