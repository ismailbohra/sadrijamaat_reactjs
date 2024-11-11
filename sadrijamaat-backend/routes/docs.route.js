const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Sadrijamaat API",
      version: "1.0.0",
      description: "API documentation for Sadrijamaat",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust the path to your routes file
};

const router = express.Router();

const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = router;
