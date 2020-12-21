const prodConfig = {
    port: 80,
    httpsPort: 443,
    sessionSecret: '',
    jwtKey: '',
    googleClientID: '',
    googleClientSecret: '',
    googleCallbackURL: 'https://dawnsheedy.com/auth/google/callback'
}
const devConfig = {
    port: 8080,
    httpsPort: 443,
    sessionSecret: 'sessionSecret',
    jwtKey: 'jwtKey',
    googleClientID: '',
    googleClientSecret: '',
    googleCallbackURL: 'http://localhost:8080/auth/google/callback'
}
const testConfig = {
    port: 80,
    httpsPort: 443,
    sessionSecret: 'sessionSecret',
    jwtKey: 'jwtKey',
    googleClientID: '',
    googleClientSecret: '',
    googleCallbackURL: 'http://localhost:8080/auth/google/callback'
}

const universal = {
    appName: 'Express-Portfolio',
    organization: 'Dawnsheedy.com',
    version: '1.0',
    environment: process.env.NODE_ENV,
    startTime: new Date().toDateString()
}

module.exports = {
    ... (process.env.NODE_ENV == 'prod') ? prodConfig : (process.env.NODE_ENV == 'dev') ? devConfig : testConfig,
    ... universal
}