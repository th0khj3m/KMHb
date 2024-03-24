import swaggerAutogen from "swagger-autogen";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "../swagger_ouput.json" assert {type: 'json'}

const outputFile = "swagger_ouput.json";
const endpointsFiles = ["./routes/*.js"]; // All routes are in 'routes' directory
// const swaggerDocument = '../swagger_ouput.json'

const options = {
  info: {
    title: "KMHb",
    description: "COMP1686 Final Year Project using PERN stack",
    version: "1.0.0",
  },
};

export default (app) => {
  swaggerAutogen(outputFile, endpointsFiles, options);
  // Setup Swagger UI middleware
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
