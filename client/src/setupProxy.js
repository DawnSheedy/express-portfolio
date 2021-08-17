const proxy = require('http-proxy-middleware').createProxyMiddleware
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    const socketProxy = createProxyMiddleware('/socket', {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug'
    })
    app.use(socketProxy)
    app.use(proxy('/auth/**', { target: 'http://localhost:8080' }))
}