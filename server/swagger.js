import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger_ouput.json";
const endpointsFiles = ["./routes/*.js"]; //All routes are in 'routes' directory

swaggerAutogen(outputFile, endpointsFiles, {
  openapi: "3.0.0",
  info: {
    title: "KMHb",
    description: "COMP1686 Final Year Project using PERN stack",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000" }],
});
