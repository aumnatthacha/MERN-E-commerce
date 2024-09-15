const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./routes/product.routes");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cartRouter = require("./routes/cart.routes");
const UserRouter = require("./routes/user.routes");
const jwt = require("jsonwebtoken");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for JSONPlaceholder",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from JSONPlaceholder.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "JSONPlaceholder",
      url: "https://jsonplaceholder.typicode.com",
    },
  },

  externalDocs: {
    description: "Download Swagger.json",
    url: "/swagger.json",
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

//config .env
dotenv.config();
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;
app.use(cors({ credentials: true, origin: CLIENT_URL }));
app.use(express.json());
app.get("/swagger.json", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(swaggerSpec);
});

//Databse Connection
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.send("<h1>This is a RESTful API for SE Shop</h1>");
});

//Add Router
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/users", UserRouter);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 *
 * components:
 *   schemas:
 *     TokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *
 * /jwt:
 *   post:
 *     summary: Generate JWT token for authentication
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *               name:
 *                 type: string
 *                 description: User password
 *     responses:
 *       200:
 *         description: Successfully generated JWT token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       500:
 *         description: Internal server error
 */
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
  res.json({ token });
});

//Run Server
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
