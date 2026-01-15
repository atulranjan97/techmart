const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
// this will be called if no other middleware has handle the request and it will create the new error object and set the status code to 404(which is a not found error)

// Now to override the default express handler we gonna create function called errorHandler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === '200' ? '500' : res.statusCode;
    let message = err.message;
    // so, if we say throw new Error('whatever the message we pass in') with a message then we can access it using `err.message`

    
    // Check for Mongoose bad ObjectId(or CastError) 
    if(err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = `Resource not found`;
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        // we are also going to send the stack trace which can be helpful for developers if we're in development
    });
    // Note: Mongoose me `CastError` tab aata hai jab `findById()` ko aisi ID milti hai jo MongoDB ke `ObjectId` format me nahi hoti. `ObjectId` hamesha 24-character ka hota hai aur sirf hex characters (0–9, a–f) allow karta hai, jaise `507f1f77bcf86cd799439011`, is type ki ID dene par Mongoose error throw nahi karta—agar record exist karta hai to data milta hai, warna null return hota hai—lekin agar ID ka format galat ho (jaise abc, 123), to Mongoose aisi value ko expected type mein convert (cast) nahi kar pata, aur CastError throw karta hai. Query DB tak pahunchne se pehle hi fail ho jaati hai aur CastError throw hota hai, isliye best practice ye hai ki request handle karne se pehle `mongoose.Types.ObjectId.isValid(id)` se ID validate kar li jaye taaki clean aur predictable 404 response mil sake.
}


export {notFound, errorHandler} 