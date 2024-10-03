import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminFname: {
        type: String,
        required: [true, "Please add the firstname"],
    },
    adminLname: {
        type: String,
        required: [true, "Please add the lastname"],
    },
    adminEmail: {
        type: String,
        required: [true, "Please add the email address"],
    },
    adminPassword: {
        type: String,
        required: [true, "Please add the user password"],
    },
    isAdmin:{
        type:Boolean,
        default:true
    },
    profile:{
        type:String,
    }
},
    {
        timestamps: true,
    }
);

export const Admin = mongoose.model("Admin", adminSchema);