import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || "").replace(/Bearer\s?/,"");
    if (!token) return res.status(403).json({message: "Not Access"})

    try {
        const decoded = jwt.decode(token, process.env.JWT_SECRET_KEY )
        req.userId = decoded._id
        next()
    } catch (err) {
        res.status(403).json({message: "Forbidden"})
    }

}