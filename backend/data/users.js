import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'Jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default users;


// Hashing is a one way function, where if you compute a hash, you can no longer reverse it.
// Hashing convert data into fixed-length string, where the same input always produces the same hash, but even a tiny change in input result in drastically different hash.

// Hashing example using SHA256
    // MySecretPassword@1234    ->      9ebbeafb032a77680c3249505e8105429fa409afd51908b6ddb480d81322fee7
    // mySecretPassword         ->      84222e6202e411030831e3e5efe95c09bc2ff4891c7ebc1ee8296291dd9c26a7

// But there is still a problem
    // Most hashing function are optimized for speed which makes it vulnerable for brute force attack, as an attacker can just generate a hash for every possible password, and reverse password using it.
    // Modern GPUs can do millions of hashes per second.

// While speed is useful in some conditions. But for storing password it's not ideal. 

// That's why we have slower hashing functions
    // It includes bcrypt, argon2, scrypt, etc. They take higher RAM, and time to compute a hash, and we can run hashing for multiple rounds which make them ideal for passwords

// We still have some problems to mitigate.
    // Attackers can use something called `rainbow tables` to crack passwords