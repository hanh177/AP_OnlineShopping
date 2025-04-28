const axios = require("axios");
const swaggerUi = require("swagger-ui-express");
const { API_SERVICES } = require("./constant");
const { APP_PORT } = process.env;

const getAggregatedDocs = async () => {
  const docs = {
    openapi: "3.0.0",
    info: {
      title: "API Gateway Documentation For AP Shopping Online",
      version: "1.0.0",
    },
    paths: {},
    components: {
      schemas: {},
      securitySchemes: {},
    },
    servers: [
      {
        url: `http://localhost:${APP_PORT}`,
      },
    ],
  };

  for (const service of API_SERVICES) {
    try {
      const response = await axios.get(service.apiDocUrl);
      const { paths, components } = response.data;

      // add prefix to each path
      Object.entries(paths).forEach(([path, methods]) => {
        const newPath = `${service.proxyPath}${path}`;
        docs.paths[newPath] = methods;
      });

      // merge components (if any)
      docs.components.schemas = {
        ...docs.components.schemas,
        ...components.schemas,
      };
      docs.components.securitySchemes = {
        ...docs.components.securitySchemes,
        ...components.securitySchemes,
      };
    } catch (error) {
      console.error(
        `⚠️ Error fetching docs from ${service.name}:`,
        error?.message || "Unknown error"
      );
    }
  }

  return docs;
};

const loadSwaggerDocs = (app) => {
  app.get("/docs-json", async (req, res) => {
    const docs = await getAggregatedDocs();
    res.json(docs);
  });

  app.use("/docs", swaggerUi.serve, async (req, res, next) => {
    const docs = await getAggregatedDocs();
    return swaggerUi.setup(docs)(req, res, next);
  });
};
module.exports = loadSwaggerDocs;
