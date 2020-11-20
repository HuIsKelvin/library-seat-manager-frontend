// vue.config.js
module.exports = {
    devServer: {
        port: 8080,
        host: "0.0.0.0",
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                // target: 'http://localhost:3000',
                ws: true,  
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            // '/': {
            //     target: 'http://localhost:8080',
            //     ws: true,  
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/': ''
            //     }
            // }
        }
    },
};