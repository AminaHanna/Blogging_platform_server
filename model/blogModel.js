import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the blog title"]
    },
    description: {
        type: String,
        required: [true, "Please add the blog description"]
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    dropdown: {
        type: mongoose.Types.ObjectId,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    isDraft: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
});

export const Blogs = mongoose.model("Blogs", blogSchema);
