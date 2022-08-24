import mongoose from "mongoose";
import Schema from "mongoose";

const boardSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    icon: {
        type: String,
        default: " 📃 "
    },
    title: {
        type: String,
        default: "Untitled"
    },
    description: {
        type: String,
        default: `Add description here 
        🟢 You can add multiline description
        🟢 Let's start...
        `
    },
    position: {
        type: Number
    },
    favorite: {
        type: Boolean,
        default: false
    },
    favoritePosition: {
        type: Number,
        default: 0
    }
},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

export default mongoose.model("Board", boardSchema)