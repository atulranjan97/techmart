import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        // password obviously will be hashed, it's not gonna be the plain text password
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
        // so in order to make admin we specifically have to go into the database and change that these values to true
    },
}, { 
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;