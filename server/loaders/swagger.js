import swaggerAutogen from "swagger-autogen";
// swagger.config.js
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Combine path construction in a single line
const outputFile = join(__dirname, "..", "swagger_output.json");

const endpointsFiles = ["./routes/*.js"]; // All routes are in 'routes' directory

const options = {
  info: {
    title: "KMHb",
    description: "COMP1686 Final Year Project using PERN stack",
  },
  host: "localhost:4000",
  schemes: ["https"],
};

export default () => {
  swaggerAutogen(outputFile, endpointsFiles, options);
};
