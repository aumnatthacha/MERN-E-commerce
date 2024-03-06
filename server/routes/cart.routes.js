/**
 * @swagger
 * components:
 *   schemas:
 *     Carts:
 *       type: object
 *       required:
 *         - product_id
 *         - name
 *         - price
 *         - email
 *         - image
 *         - quantity
 *       properties:
 *         product_id:
 *           type: string
 *           description: The id of the Cart
 *         name:
 *           type: string
 *           description: The name of the Cart
 *         price:
 *           type: number
 *           description: The price of the Cart
 *         email:
 *           type: string
 *           description: The email of the Cart
 *         image:
 *           type: string
 *           description: The image of the Cart
 *         quantity:
 *           type: integer
 *           description: The quantity of the Cart
 *       example:
 *         product_id: "12345"
 *         name: "Test"
 *         email: "aumnatthacha@gmail.com"
 *         price: 3000
 *         image: "http://example.com/macbook.jpg"
 *         quantity: 6
 *   tags:
 *     - name: Carts
 *       description: API for managing carts
 */
const express = require("express");
const router = express.Router();
const cartModel = require("../models/Carts.model");

/**
 * @swagger
 * /Carts:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Carts]
 *     responses:
 *       200:
 *         description: A list of carts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carts'
 *       500:
 *         description: Some error happened
 */
router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /Carts/{email}:
 *   get:
 *     summary: Get cart by email
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart email
 *     responses:
 *       200:
 *         description: The Cart by email.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carts'
 *       404:
 *         description: Cart Not Found
 *       500:
 *         description: Some error happened
 */
router.get("/:email", async (req, res) => {
  try {
    const cartEmail = req.params.email;
    const cart = await cartModel.findOne({ email: cartEmail });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /Carts:
 *   post:
 *     summary: Create a new Cart or increment quantity by 1 if the product already exists
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carts'
 *     responses:
 *       201:
 *         description: The Cart created or quantity incremented successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carts'
 *       500:
 *         description: Some error happened
 */
router.post("/", async (req, res) => {
  const { product_id } = req.body;
  try {
    const existingCart = await cartModel.findOne({ product_id });

    if (existingCart) {
      existingCart.quantity += 1;
      const updatedCart = await existingCart.save();
      res.status(201).json(updatedCart);
    } else {
      const newCart = new cartModel({ ...req.body, quantity: 1 });
      const cart = await newCart.save();
      res.status(201).json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /Carts/{id}:
 *   put:
 *     summary: Update cart by id
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carts'
 *     responses:
 *       200:
 *         description: The Cart updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carts'
 *       404:
 *         description: Cart Not Found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await cartModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /Carts/{id}:
 *   delete:
 *     summary: Delete cart by id
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The cart Id
 *     responses:
 *       200:
 *         description: The Cart is deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Carts'
 *       404:
 *         description: Cart Not Found
 *       500:
 *         description: Some error happened
 */
router.delete("/:id", async (req, res) => {
  try {
    const cart = await cartModel.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ message: "Cart Not Found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
