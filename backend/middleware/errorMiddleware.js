const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}
// this will be called if no other middleware has handle the request and it will create the new error object and set the status code to 404(which is a not found error)

// Now to override the default express handler we gonna create function called errorHandler
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    // so, if we say throw new Error('whatever the message we pass in') with a message then we can access it using `err.message`

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        // we are also going to send the stack trace which can be helpful for developers if we're in development
    });
}


export {notFound, errorHandler} 