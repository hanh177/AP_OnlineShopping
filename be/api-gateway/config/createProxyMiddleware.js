const proxy = require("express-http-proxy");
const { API_SERVICES } = require("../constant");

const createProxyMiddleware = (targetPort) => {
  return proxy(`http://localhost:${targetPort}`, {
    preserveHostHdr: true,
    parseReqBody: true,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.headers["content-type"]) {
        proxyReqOpts.headers["Content-Type"] = srcReq.headers["content-type"];
      }
      return proxyReqOpts;
    },
  });
};

const loadServices = (app) => {
  API_SERVICES.forEach((service) => {
    app.use(service.proxyPath, createProxyMiddleware(service.port));
  });
};
module.exports = loadServices;
