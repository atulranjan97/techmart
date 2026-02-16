// If you're not using a proxy in vite config file
// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
// export const PRODUCTS_URL = `${BASE_URL}/api/products`;
// export const USERS_URL = `${BASE_URL}/api/users`;
// export const ORDERS_URL = `${BASE_URL}/api/orders`;
// export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
// export const UPLOAD_URL = `${BASE_URL}/api/upload`;


// if you are using a proxy in our vite config file then we don't need to set base url here again
export const BASE_URL = '';
export const PRODUCTS_URL = '/api/products';
export const USERS_URL = '/api/users';
export const ORDERS_URL = '/api/orders';
export const PAYPAL_URL = '/api/config/paypal';
export const UPLOAD_URL = '/api/upload';
