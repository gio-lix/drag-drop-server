import mongoose from "mongoose";
import Schema from "mongoose";

const sectionSchema = new mongoose.Schema({
    board: {
        type: Schema.Types.ObjectId,
        ref: "Board",
        require: true
    },
    title: {
        type: String,
        default: ""
    },

},{
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
})

export default mongoose.model("Section", sectionSchema)