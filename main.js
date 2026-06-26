const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");

const swaggerUi =
  require("swagger-ui-express");

const YAML =
  require("yamljs");

const authRoute =
  require("./routes/auth.route");

dotenv.config();

const app = express();

app.use(express.json());

connectDB();

const swaggerDocument =
  YAML.load("./docs/swagger.yaml");

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/api", authRoute);
console.log(`swagger docs is running on http://localhost:6000/api-docs`)
app.listen(6000, () => {
  console.log(
    "Server running on port 6000"
  );
});