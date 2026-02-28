// External Modules
import express from 'express';
// Custom Modules
import { protect, admin } from '../middleware/authMiddleware.js';
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
    getRecentOrders,
    getOrdersStats,
} from "../controller/orderController.js";
import checkObjectId from '../middleware/checkObjectId.js';

const router = express.Router();


router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/recent').get(protect, admin, getRecentOrders)
router.route('/stats').get(protect, admin, getOrdersStats);
router.route('/:id').get(protect, checkObjectId, getOrderById);
router.route('/:id/pay').put(protect, checkObjectId, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, checkObjectId, updateOrderToDelivered);
// router.get('/:id/usd', protect, getOrderUsdAmount);



export default router;