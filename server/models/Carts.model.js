const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//Schema
const CartSchema = new Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    email: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
}, {
    timestamps: true,
});

const CartModel = model("Carts", CartSchema);
module.exports = CartModel;
