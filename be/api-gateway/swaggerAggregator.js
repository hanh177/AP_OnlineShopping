const axios = require("axios");
const { APP_USER_PORT, APP_PRODUCT_PORT, APP_PORT } = process.env;

const services = [
  {
    name: "Users",
    url: `http://localhost:${APP_USER_PORT}/docs-json`,
    prefix: "/users", // prefix for each path when proxy to user service
  },
  {
    name: "Products",
    url: `http://localhost:${APP_PRODUCT_PORT}/docs-json`,
    prefix: "/products", // prefix for each path when proxy to product service
  },
];

const getAggregatedDocs = async () => {
  const docs = {
    openapi: "3.0.0",
    info: {
      title: "API Gateway Documentation For AP Shopping Online",
      version: "1.0.0",
    },
    paths: {},
    components: {},
    servers: [
      {
        url: `http://localhost:${APP_PORT}`,
      },
    ],
  };

  for (const service of services) {
    try {
      const response = await axios.get(service.url);
      const { paths, components } = response.data;

      // add prefix to each path
      Object.entries(paths).forEach(([path, methods]) => {
        const newPath = `${service.prefix}${path}`;
        docs.paths[newPath] = methods;
      });

      // merge components (if any)
      Object.assign(docs.components, components || {});
    } catch (error) {
      console.error(
        `⚠️ Error fetching docs from ${service.name}:`,
        error?.message || "Unknown error"
      );
    }
  }

  return docs;
};

module.exports = getAggregatedDocs;
