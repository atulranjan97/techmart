import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    // it's also gonna have a user cause we need to know which user created it
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, { timestamps: true, })

const productSchema = mongoose.Schema({
    // every product needs to be connected to user, there's a need to establish a relationship because we need to know which user(in this case it's gonna be a admin user) added that product
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User",},
    name: {type: String, required: true,},
    image: {type: String, required: true,},     // actual image gets stored in the file structure but the name of the image (the location) is stored here
    description: {type: String, required: true,},
    brand: {type: String, required: true,},
    category: {type: String, required: true,},
    price: {type: Number, required: true, default: 0,},
    countInStock: {type: Number, required: true, default: 0,}, 
    rating: {type: Number, required: true, default: 0,},
    numReviews: {type: Number, required: true, default: 0,},
    reviews: [reviewSchema],
    // review gonna be another schema and we could put that in seperate file but we'll just put in this file

}, { timestamps: true});
// We also want timestamps meaning we want createdAt and modifiedAt field, so that we automatically add the created at field

// Obviously the user that create the product is not the same user in the review


const Product = mongoose.model("Product", productSchema);

export default Product;

// `Models` are fancy constructors compiled from `Schema` definitions. An instance of a model is called a `document`. Models are responsible for creating and reading documents from the underlying MongoDB database.

// The first argument is the singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name. Thus, for the example above, the model Product is for the products collection in the database.