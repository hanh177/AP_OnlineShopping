const proxy = require("express-http-proxy");
const { API_SERVICES, HEADER_AUTH } = require("./constant");

const createProxyMiddleware = (targetUrl) => {
  return proxy(targetUrl, {
    preserveHostHdr: true,
    parseReqBody: true,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      if (srcReq.headers["content-type"]) {
        proxyReqOpts.headers["Content-Type"] = srcReq.headers["content-type"];
      }

      if (srcReq.decodedData) {
        proxyReqOpts.headers[HEADER_AUTH] = JSON.stringify(srcReq.decodedData);
      }

      return proxyReqOpts;
    },
  });
};

const loadServices = (app) => {
  API_SERVICES.forEach((service) => {
    app.use(service.proxyPath, createProxyMiddleware(service.url));
  });
};
module.exports = loadServices;
