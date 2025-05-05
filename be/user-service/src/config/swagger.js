const fs = require("fs");
const path = require("path");

const getSwaggerConfig = () => {
  const docs = {
    openapi: "3.0.0",
    info: {
      title: "User Service API",
      version: "1.0.0",
      description: "API for user service",
    },
    paths: {},
    components: {},
    servers: [
      {
        url: `${process.env.BASE_URL}`,
      },
    ],
  };

  const swaggerDocument = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../swagger.json"), "utf8")
  );
  docs.paths = swaggerDocument.paths;
  docs.components = swaggerDocument.components;

  return docs;
};

module.exports = getSwaggerConfig;
