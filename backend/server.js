import express from 'express';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const port = process.env.PORT;

const app = express();

app.use('/api/products', productRoutes);
// Express has a router that we can use so we can put our routes in seperate files
// so anytime we hit an http request to url prefixes with /api/products, it's gonna go to the file productRoutes to handle the request

app.use(notFound);
app.use(errorHandler);

connectDB(() => {
    app.listen(port, () => console.log(`Server is running on port ${port}`));
})
