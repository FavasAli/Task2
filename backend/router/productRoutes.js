import express from "express";
import {
  createProduct,
  getAllProducts,
  deleteProduct
} from "../controllers/productController.js";
import {protect} from '../middlewares/authMiddleware.js'

const router = express.Router();

router.route("/addproduct/:id").post(protect,createProduct);
router.route("/listproducts").get(protect,getAllProducts);
// router.route("/listproducts").get(getAllProducts);
router.route("/deleteproduct/:id").delete(protect,deleteProduct);

export default router;
