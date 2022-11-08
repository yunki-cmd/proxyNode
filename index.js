const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')
require('dotenv').config()
const params = require("./middlewares/readParams")



// Create Express Server
const app = express();
app.use(cors())
// Configuration
const PORT = process.env.PORT
const HOST = process.env.HOST || 'localhost'
const API_SERVICE_URL = process.env.API_SERVICE_URL

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });

 // Proxy endpoints
 app.use('/taas/appiumInspector',params.readeParams, createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/taas/appiumInspector`]: '',
    },
 }));


// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });