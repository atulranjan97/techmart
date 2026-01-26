// External Modules
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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



// add a custom method to the User model that checks whether a given password matches the hashed password stored in the database.
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// In Mongoose, `methods` is a fixed, reserved property (you cannot rename it). Anything you attach here becomes available on document instances.
// Related (for clarity)
    // schema.methods → instance methods (run on one User)
    // schema.statics → static methods (run on the model)


// Hash the password only when it changes
// Skip hashing when updating other fields (name, email, etc.)
userSchema.pre('save', async function () {
    // if password is not modified
    if (!this.isModified('password')) {
        return; 
        // so if we're just saving some user data, but we're not dealing with the password, then it's just gonna move on to next piece of middleware
    }
    // You only want to hash the password when it actually changes.
    // If the document is new, all fields are considered modified

    // if password is modified then hash it before performing save operation on the database
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // this prevents:- Re-hashing an already-hashed password on every save.
})
// `.pre` allows us to do something before it's saved in the database. So anything that has to do with the user, if we're saving something to the database then this will run before because obviously we wanna hash password before it gets saved to the database.




const User = mongoose.model("User", userSchema);

export default User;