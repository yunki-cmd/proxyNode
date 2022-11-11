const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')
require('dotenv').config()
const params = require("./middlewares/readParams")



// Create Express Server
const app = express();
app.use(express.json());
app.use(cors())
// Configuration
const PORT = process.env.PORT
const HOST = process.env.HOST || 'localhost'
const API_SERVICE_URL = process.env.API_SERVICE_URL
const API_SERVICE_STF = process.env.API_SERVICE_STF
const API_SERVICE_GRID = process.env.API_SERVICE_GRID
// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to Billing and Account APIs.');
 });

 const restream = function(proxyReq, req, res, options) {
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        proxyReq.setHeader('Content-Type','application/json;charset=UTF-8');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        // stream the content
        proxyReq.write(bodyData);
    }
}

 app.use('/taas/stf', createProxyMiddleware({
    target: API_SERVICE_STF,
    changeOrigin: false,
    ws:true,
    pathRewrite: {
        [`^/taas/stf`]: '',
    }
 }));

 app.use('/taas/grid', params.readGrid,createProxyMiddleware({
    target: API_SERVICE_GRID,
    changeOrigin: false,
    onProxyReq: restream,
    ws:true,
    pathRewrite: {
        [`^/taas/grid`]: '',
    }
 }));

 app.use('/taas/appiumInspector/session/:idSession',params.readSession, createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: false,
    ws:true,
    pathRewrite: {
        [`^/taas/appiumInspector`]: '',
    }
 }));

 // Proxy endpoints
 app.use('/taas/appiumInspector',params.readeParams, createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: false,
    ws:true,
    pathRewrite: {
        [`^/taas/appiumInspector`]: '',
    }
 }));


// Start the Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
 });