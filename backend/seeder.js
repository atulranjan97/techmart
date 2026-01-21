import mongoose from "mongoose";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js"
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js"

import connectDB from "./config/db.js";

connectDB();


const importData = async ( ) => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        })

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse); 
        process.exit(1);
    }
}
// this function will import(seed) data from our application to our database

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        
        console.log('Data Destroyed!'.red.inverse);
        process.exit();    
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);    
    }
}


if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

// In package.json, we add the following two script
    // "data:import": "node --env-file=.env backend/seeder.js",
    // "data:destroy": "node --env-file=.env backend/seeder.js -d"
    // now we can execute importData function through command line interface(or terminal) by using command `npm run data:import`
    // And we can execute destroyData function through command line interface(or terminal) by using command `npm run data:destroy -d`