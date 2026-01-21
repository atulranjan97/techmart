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


export {getProducts, getProductById};