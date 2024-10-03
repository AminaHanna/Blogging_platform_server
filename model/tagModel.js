import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add tag name"]
    }
},
    {
        timestamps: true
    }
);

export const Tag = mongoose.model("Tag", tagSchema);