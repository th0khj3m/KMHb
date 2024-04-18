import swaggerAutogen from "swagger-autogen";

const outputFile = "swagger_ouput.json";
const endpointsFiles = ["./routes/*.js"]; // All routes are in 'routes' directory

const options = {
  info: {
    title: "KMHb",
    description: "COMP1686 Final Year Project using PERN stack",
  },
  host: 'localhost:4000',
  schemes: ['http']
};

export default () => {
  swaggerAutogen(outputFile, endpointsFiles, options);
};
