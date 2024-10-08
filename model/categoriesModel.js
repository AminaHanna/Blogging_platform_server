import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add category name"]
    }
},
    {
        timestamps: true
    }
);

export const Category = mongoose.model("Category", categorySchema);