// External Modules
import express from 'express';
import cookieParser from 'cookie-parser';
// Local Modules
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT;

const app = express();

// Body parser middleware
app.use(express.json());    // for parsing raw json data
app.use(express.urlencoded({ extended: true }));    // for parsing urlencoded data
// there used to be a third party package named `body-parser` that we had to install to parse body data but now it comes out of the box with express


// Cookie parser middleware
app.use(cookieParser());
// this will allow us to access `req.cookies` and since our cookie is calles `jwt`, we'll be able to access `req.cookies.jwt`



app.use('/api/products', productRoutes);
// Express has a router that we can use so we can put our routes in seperate files
// so anytime we hit a http request to url prefixes with /api/products, it's gonna go to the file `productRoutes` to handle the request

app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/config/paypal', (req, res) => 
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

app.use(notFound);
app.use(errorHandler);

connectDB(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
})
