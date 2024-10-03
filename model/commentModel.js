import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, "Please add a comment"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
});

export const Comment = mongoose.model("Comment", commentSchema);
