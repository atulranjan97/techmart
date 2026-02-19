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

// Static Routes
router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);  
router.route("/checkout").get(prepareCheckout);


// Nested Routes
router.route("/:id/reviews").post(protect, createProductReview);

// Dynamic Routes
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);



export default router;

// IMPORTANT: Keep dynamic routes (/:id) BELOW specific routes like /top or /checkout.
// Express matches routes in order. If /:id comes first, it will capture
// requests like /top (id = "top") and the specific route will never run.
