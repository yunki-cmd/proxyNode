const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");
require("dotenv").config();
const params = require("./middlewares/readParams");
/* const fetch = require("node-fetch");
const sessionIds = require("./middlewares/sessionbd"); */

// Create Express Server
const app = express();
app.use(cors());
// Configuration
const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";
const API_SERVICE_URL = process.env.API_SERVICE_URL;
const API_SERVICE_STF = process.env.API_SERVICE_STF;
const API_SERVICE_GRID = process.env.API_SERVICE_GRID;
const API_SERVICE_APPIUM_SESSION = process.env.API_SERVICE_APPIUM_SESSION;
// Logging
app.use(morgan("dev"));

// Info GET endpoint
app.get(
  "/taas/grid/sessions",
  createProxyMiddleware({
    target: API_SERVICE_APPIUM_SESSION,
    changeOrigin: false,
    ws: true,
    pathRewrite: {
      [`^/taas/grid`]: "",
    },
  })
);

app.delete(
  "/taas/grid/*",
  params.readGrid,
  createProxyMiddleware({
    target: API_SERVICE_GRID,
    changeOrigin: false,
    ws: true,
    pathRewrite: {
      [`^/taas/grid`]: "",
    },
  })
);

// app.use(express.json());

const restream = function (proxyReq, req, res, options) {
  console.log(req.body);
  if (req.body) {
    let bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader("Content-Type", "application/json;charset=UTF-8");
    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
};

/* app.use('/taas/stf', createProxyMiddleware({
    target: API_SERVICE_STF,
    changeOrigin: false,
    ws:true,
    pathRewrite: {
        [`^/taas/stf`]: '',
    }
 })); */

app.post(
  "/taas/grid/wd/hub/session",
  express.json(),
  params.readGrid,
  createProxyMiddleware({
    target: API_SERVICE_GRID,
    changeOrigin: false,
    onProxyReq: restream,
    ws: true,
    pathRewrite: {
      [`^/taas/grid`]: "",
    },
  })
);

app.post(
  "/taas/grid/wd/hub/session/:session/*",
  express.json(),
  params.readGrid,
  createProxyMiddleware({
    target: API_SERVICE_GRID,
    changeOrigin: false,
    onProxyReq: restream,
    ws: true,
    pathRewrite: {
      [`^/taas/grid`]: "",
    },
  })
);

app.get(
  "/taas/grid/*",
  express.json(),
  params.readGrid,
  createProxyMiddleware({
    target: API_SERVICE_GRID,
    changeOrigin: false,
    onProxyReq: restream,
    ws: true,
    pathRewrite: {
      [`^/taas/grid`]: "",
    },
  })
);

//appium inspector

app.use(
  "/taas/appiumInspector/session/:idSession",
  express.json(),
  params.readSession,
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: false,
    onProxyReq: restream,
    ws: true,
    pathRewrite: {
      [`^/taas/appiumInspector`]: "",
    },
  })
);

// Proxy endpoints
app.use(
  "/taas/appiumInspector",
  express.json(),
  params.readeParams,
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: false,
    onProxyReq: restream,
    ws: true,
    pathRewrite: {
      [`^/taas/appiumInspector`]: "",
    },
  })
);

// Start the Proxy
app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
