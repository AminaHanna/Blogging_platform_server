import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    type: {
        type: String,
        enum: ["like", "comment", "follow", "general"],
        required: [true, "Please specify the type of notification"]
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: function() {
            return this.type === "like" || this.type === "comment";
        }
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: function() {
            return this.type === "comment";
        }
    },
    message: {
        type: String,
        required: [true, "Please add a notification message"]
    },
    read: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Notification = mongoose.model("Notification", notificationSchema);
