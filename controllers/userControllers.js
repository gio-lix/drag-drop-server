import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js";
import dotenv from "dotenv"
dotenv.config()

export const register = async (req, res) => {
    try {
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const doc = new User({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash
        })
        const user = await doc.save()


        const token = jwt.sign({
            _id: user._id
        }, "secret123", {expiresIn: "30d"})

        const {passwordHash, ...userData} = user._doc
        res.json({...userData, token})

    } catch (err) {
        res.status(500).json({message: "Something went wrong"})
    }
}

export const login = async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(404).json({message: "User did not found"})
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(404).json({message: "Password is not correct"})
        }

        const token = jwt.sign({
            _id: user._id
        }, "secret123", {expiresIn: "30d"})
        const {passwordHash, ...userData} = user._doc
        res.json({...userData, token})
    } catch (err) {
        res.status(500).json({message: "Something went wrong"})
    }
}
export const auth = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if (!user) return res.status(404).json({message: "Unauthorized"})

        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch (err) {
        return res.status(404).json({message: "Unauthorized"})
    }
}






