// Core module
import path from "path";
// External Modules
import express from "express";
import cookieParser from "cookie-parser";
// Local Modules
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const port = process.env.PORT;

const app = express();

// Body parser middleware
app.use(express.json()); // for parsing raw json data
app.use(express.urlencoded({ extended: true })); // for parsing urlencoded form data
// there used to be a third party package named `body-parser` that we had to install to parse body data but now it comes out of the box with express

// Cookie parser middleware
app.use(cookieParser());
// this will allow us to access `req.cookies` and since our cookie is calles `jwt`, we'll be able to access `req.cookies.jwt`

app.use("/api/products", productRoutes);
// Express has a router that we can use so we can put our routes in seperate files
// so anytime we hit a http request to url prefixes with /api/products, it's gonna go to the file `productRoutes` to handle the request

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID }),
);

// Make upload folder static
const __dirname = path.resolve(); // set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  // any route that is not api will be redirected to index.html
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

connectDB(() => {
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
