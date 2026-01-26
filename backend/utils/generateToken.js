import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d'});
    // it takes in a few things and first is gonna be an object with a payload and what we send in a payload is the userId, the next thing we wanna pass in is a secret which we don't want the secret to be just put in this file, we want to put it in our environment variables, the last thing we want to pass in is a object (when do we want this token to expire)
    
    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
            // Prevents JavaScript from reading or modifying the cookie.
            // Protects against token theft via XSS attacks.
        secure: process.env.NODE_ENV !== 'development', 
            // Cookie is sent only over HTTPS when `true`. We only want this to be true if we're in production.
            // In development(HTTP), this is disabled so cookie still works locally.  
        sameSite: 'strict',     //  Browser will not send this cookie with cross-site requests. Strong protection against CSRF attacks.
        maxAge: 30 * 24 * 60 * 60 * 1000,    // Cookie expires after 30 days (in milliseconds).  After expiration, the browser automatically deletes it.
    })
    // jwt will going to get store in this http only cookie on server and then it'll get sent with every subsequent request after we log in.
}

export default generateToken;