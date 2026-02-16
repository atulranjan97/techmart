import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  prepareCheckout,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// router.get('/', getProducts)
router.route("/").get(getProducts).post(protect, admin, createProduct);

// router.get('/:id', getProductById)
router.route("/:id").get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

router.route("/checkout").post(prepareCheckout);

export default router;
