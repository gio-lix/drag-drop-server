import mongoose from "mongoose";
import Schema from "mongoose";

const taskSchema = new mongoose.Schema({
    section: {
        type: Schema.Types.ObjectId,
        ref: "Section",
        require: true
    },
    title: {
        type: String,
        default: ""
    },
    content: {
        type: String,
        default: ""
    },
    position: {
        type: Number
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

export default mongoose.model("Task", taskSchema)