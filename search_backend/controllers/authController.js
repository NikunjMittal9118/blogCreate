import User from '../models/userModel.js'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()

const register = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin
        })

        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
}

const login = async (req, res) => {
    try{
        const user = await User.findOne({
            userName: req.body.userName,
        })
        if(!user){
            res.status(404).send("User not found!")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect){
            res.status(404).send("Wrong username or password")
        }
        const token = jwt.sign({
            id: user._id,
            userName: user.userName,
            email: user.email,
            isAdmin: user.isAdmin,
            profilePic: user.profilePic
        }, process.env.JWT)
        const { password, ...otherDetails} = user._doc
        console.log(user, token, otherDetails)
        res.cookie("access_token", token).status(201).json({...otherDetails})
    }
    catch(err){
        res.status(500).json(err)
    }

}

export { register, login }