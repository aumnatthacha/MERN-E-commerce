/**
 * @swagger
 * components:
 *  schemas:
 *      Products:
 *          type: object
 *          required:
 *              - name
 *              - price
 *              - description
 *              - image
 *              - category
 *          properties:
 *              name:
 *                  type: string
 *                  description: The name of the product
 *              price:
 *                  type: number
 *                  description: The price of the product
 *              description:
 *                  type: string
 *                  description: The description of the product
 *              image:
 *                  type: string
 *                  description: The image URL of the product
 *              category:
 *                  type: string
 *                  description: The category of the product
 *          example:
 *              name: "Macbook Pro"
 *              price: 2000
 *              description: "The description of the product"
 *              image: "http://example.com/macbook.jpg"
 *              category: "Electronics"
 * tags:
 *  name: Products
 *  description: API operations related to products
 */

const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: Successful response with a list of products
 *         content:
 *           application/json:
 *             example:
 *               - name: "Macbook Pro"
 *                 price: 2000
 *                 description: "The description of the product"
 *                 image: "http://example.com/macbook.jpg"
 *                 category: "Electronics"
 *               - name: "iPhone 12"
 *                 price: 1000
 *                 description: "Another product description"
 *                 image: "http://example.com/iphone.jpg"
 *                 category: "Electronics"
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *      summary: Get a product by ID
 *      tags: [Products]
 *      parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              description: ID of the product
 *              schema:
 *                  type: string
 *              description: Successful response with the product by ID
 *     responses:
 *       200:
 *         description: Successful response with the product by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request, missing or invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Products'
 *     responses:
 *       200:
 *         description: Successful response with the updated product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
