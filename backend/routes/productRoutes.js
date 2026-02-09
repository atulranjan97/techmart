import express from 'express';
const router = express.Router();
import { getProducts, getProductById, prepareCheckout } from '../controller/productController.js';


// router.get('/', getProducts)
router.route('/').get(getProducts);


// router.get('/:id', getProductById)
router.route('/:id').get(getProductById);

router.route('/checkout').post(prepareCheckout);

export default router;