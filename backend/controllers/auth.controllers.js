import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from "../utils/generateToken.js";



export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;


        // if the passwords do not match logic
        if (password != confirmPassword) {
            return res.staus(400).json({
                error: "Passwords do not match"
            })
        }

        //find user with a username in database
        const user = await User.findOne({ username })


        // if user already exists logic
        if (user) {
            return res.status(400).json({
                error: "Username already exists"
            })
        }

        // Hash Password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        // api url : https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        })

        if (newUser) {
            // Generate JWT token here
            generateTokenAndSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({
                error: "Invalid user data"
            })
        }

    } catch (error) {
        console.log("Error in signUp controller", error.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

export const login = async (req, res) => {
    res.send("login logic")
}

export const logout = async (req, res) => {
    res.send("logout logic")
}
