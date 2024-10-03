import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const adminVerifyToken = (req, res, next) => {
    const headerWithToken = req.headers.authorization
   
    if(!headerWithToken) {
        res.status(400).json("Token is not Provided");
        return false;
    }

    const token = headerWithToken.split(" ")[1];

    if(!token) {
        res.status(404).json("Token is not Provided");
        return false;
    }



    var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    if(decoded.isAdmin) {
        next()
    }
    else {
        res.status(400),json("Admin not authenticated!")
    }
}