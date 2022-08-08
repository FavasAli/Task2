import Product from "../model/productModel.js";
import asyncHandler from "express-async-handler";

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, quantity, category } = req.body;

  const user = req.params.id;
  const productExist = await Product.findOne({ name });
  if (productExist) {
    res.status(401);
    throw new Error("Product Already exist");
  }

  const product = new Product({
    user,
    name,
    price,
    quantity,
    category,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

const getAllProducts = asyncHandler(async (req, res) => {
   const user = req.user._id;

   const products = await Product.find({ user });
  // const products = await Product.find({});
  if (!products) {
    res.status(401);
    throw new Error("Product Not Found,add products");
  }

  res.status(200).json(products);
});

const deleteProduct = asyncHandler(async (req, res) => {
  
  const product = await Product.findById(req.params.id);
  if (product) {
    product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(401);
    throw new Error("Product not found");
  }
});

export { createProduct, getAllProducts, deleteProduct };
