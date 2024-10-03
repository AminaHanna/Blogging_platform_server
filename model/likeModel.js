import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
    }
}, {
    timestamps: true
});

export const Like = mongoose.model("Like", likeSchema);
