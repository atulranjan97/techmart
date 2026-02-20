import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  prepareCheckout,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from "../controller/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import checkObjectId from "../middleware/checkObjectId.js";

// Static Routes
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);  
router.route("/checkout").get(prepareCheckout);


// Nested Routes
router.route("/:id/reviews").post(protect, checkObjectId, createProductReview);

// Dynamic Routes
router
  .route("/:id")
  .get(checkObjectId, getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);



export default router;

// IMPORTANT: Keep dynamic routes (/:id) BELOW specific routes like /top or /checkout.
// Express matches routes in order. If /:id comes first, it will capture
// requests like /top (id = "top") and the specific route will never run.
