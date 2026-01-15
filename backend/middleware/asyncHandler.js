const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
}


export default asyncHandler;


/*
    const asyncHandler = (fn) =>{
        return (req, res, next) => {
            Promise.resolve(fn(req, res, next)).catch(next);
        }
    }

    .then() kyun nahi likha?
        - kyunki hume success case handle hi nahi karna

        success me:
            - route khud `res.json()` bhej deta hai
            - Express request end kar deta hai

        isliye .then() useless hota hai
*/

/*
    const p = new Promise(resolve => resolve("OK"));

    Promise.resolve(p)
    .then(data => console.log(data));

    Output: OK

    Agar value pehle se promise hai ,to vahi return ho jata hai
*/
