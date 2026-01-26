// External Module
import mongoose from "mongoose";

const connectDB = async (callback) => {
   try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      // mongoose.connect() returns a promise that resolves when connection is established 
    
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      callback()
   } catch (error) {
      console.log(`Error: ${error}`);
      // exit the process
      process.exit(1);
   }
}
// any methods that we call whether it's from a mongoose model or from a mongoose itself, it's gonna return a promise, so you either use the .then().catch syntax or async-await

export default connectDB;