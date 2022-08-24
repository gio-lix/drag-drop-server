import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    passwordHash : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

export default mongoose.model("User",UserSchema)
