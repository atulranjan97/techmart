// Local Modules
import Product from "../models/productModel.js";
import asyncHandler from "../middleware/asyncHandler.js";


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});    
    // passing an empty object {} will get all the documents inside the products collection, if you want to limit it to certain products then you could pass in some options here

    res.json(products);
})



// @desc    Fetch a product 
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    // const product = await Product.findOne({_id: req.params.id});
    const product = await Product.findById(req.params.id);

    if(product) {
        return res.json(product);
    }

    res.status(404);
    throw new Error('Resource not found');
})


// const getProductById = asyncHandler(async (req, res) => {
//     if(mongoose.Types.ObjectId.isValid(req.params.id)) {
//         const product = await Product.findById(req.params.id);

//         if(product) {
//             return res.json(product);
//         }
//     }

//     res.status(404);
//     throw new Error('Resource not found');
// })


// @desc    Fetch a product and calculate the prices 
// @route   POST /api/products/checkout
// @access  Public
const prepareCheckout = asyncHandler(async (req, res) => {
    console.log("prepare checkout controller method running");
    const {productId, qty} = req.body;

    if (!productId || !qty) {
        res.status(404);
        throw new Error('ProductId and qty required');
    }

    if (isNaN(qty) || qty < 1) {
        res.status(400);
        throw new Error('Invalid quantitiy');
    }

    const product = await Product.findById(productId).lean();

    if (!product) {
        res.status(404);
        throw new Error('Resourse not found');
    }

    if (qty > product.countInStock) {
        res.status(400);
        throw new Error('Requested quantity exceeds available stock');
    }
    
    // Price calculations
    const itemsPrice = Number((product.price * Number(qty)).toFixed(2))
    const shippingPrice = Number((itemsPrice < 499 ? 50 : 0).toFixed(2)); 
    const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    const checkoutSummary = {
        product: [{...product, qty}],
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
    }

    res.status(200).json(checkoutSummary);
})


export {getProducts, getProductById, prepareCheckout};