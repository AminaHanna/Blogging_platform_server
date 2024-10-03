import { Admin } from "../model/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
    try {
        const { adminFname, adminLname,adminEmail, adminPassword } = req.body

        if(!adminFname) {
            return res.status(400).json({ message: "first name is missing" });
        }
        if(!adminLname) {
            return res.status(400).json({ message: "last name is missing" });
        }
        if(!adminEmail) {
            return res.status(400).json({ message: "email is missing" });
        }
        if(!adminPassword) {
            return res.status(400).json({ message: "password is missing" });
        }

        const isMailExist = await Admin.findOne({ adminEmail:adminEmail });

        if(!!isMailExist) {
            return res.status(404).json({ message: "Mail is Exixting, Please enter another one..." });
        }

        bcrypt.hash(req.body.adminPassword, 10, async(err, hash) => {
            const newAdmin = new Admin ({
                adminFname, adminLname, adminEmail, adminPassword:hash
            })

            const saveAdmin = await newAdmin.save();

            if(saveAdmin) {
                return res.status(200).json({ user:saveAdmin, message: "Successfully inserted dat into db" });
            } else {
                return res. status(400).json({ user:saveAdmin, message: "No Datas are inserted into the db" });
            }
        })

    } catch (error) {
        return res.status(404).json({ message: error.message || "error" });
    }
}



export const signIn = async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    if (!adminEmail) {
        return res.status(400).json({ message: "Email is Missing" });
    }
    if (!adminPassword) {
        return res.status(400).json({ message: "Password is Missing" });
    }

    const getAdmin = await Admin.findOne({ adminEmail });

    if (!getAdmin) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    bcrypt.compare(req.body.adminPassword, getAdmin.adminPassword).then(function (result) {
       if (result) {
        const token = jwt.sign({ userId: getAdmin._id, isAdmin: getAdmin.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn:"30d" });

        return res.status(200).json({ users: getAdmin, message: "Successfull", token });
       }  else {
        return res.status(400).json({ message: "Invalid Email or Password" });
       }
    })
}


export const getAdmin = async (req, res) => {
    try {

        const getAdmin = await Admin.findById(req.user.userId)

        if(!getAdmin) {
            return res.status(400).json({ message: "admin is not found "});
        }

        return res.status(200).json({ user: getAdmin });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'error' });
    }
}

export const updateAdminProfile = async (req, res) => {
    try {

        const getAdmin = await Admin.findById(req.user.userId)

        if(!getAdmin) {
            return res.status(400).json({ message: "admin is not found "});
        }

        await Admin.findByIdAndUpdate(req.user.userId,{$set:req.body})

        return res.status(200).json({ message: 'updated admin' });
    } catch (error) {
        return res.status(400).json({ message: error.message || 'error' });
    }
}


export const getAllAdmin = async (req, res) => {
    try {
        const getAllAdmin = await Admin.find()

        if (!getAllAdmin.length > 0) {
            return res.status(400).json({ message: "collection is not found"});
        }

        return res.status(200).json({ users: getAllAdmin, message: "users"});
    } catch(error) {
        return res.status(400).json({ message: error.message || 'error' });
    }
}