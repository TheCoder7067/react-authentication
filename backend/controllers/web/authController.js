import jwt from "jsonwebtoken";
import fs from "fs";
import users from "../../models/userModel.js";

export const Signup = async (req, res) => {
    try {
        const { name, mobile, email, password, address } = req.body;

        const existingUser = await users.findOne({
            $or: [{ email: email }, { mobile: mobile }]
        });

        if (existingUser) {
            if (req.file) fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: "User with this Email or Mobile already exists!"
            });
        }

        const totalUsers = await users.countDocuments();
        const uId = `user-${totalUsers + 1}`;

        const newUser = new users({
            userId: uId,
            name,
            mobile,
            email,
            password,
            address,
            user_image: req.file ? req.file.path.replace(/\\/g, "/") : ''
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { id: savedUser.userId },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            message: "User registered successfully!",
            token,
            user: {
                userId: savedUser.userId,
                type: savedUser.type,
                name: savedUser.name,
                mobile: savedUser.mobile,
                email: savedUser.email,
                address: savedUser.address,
                user_image: savedUser.user_image
            }
        });

    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const Login = async (req, res) => {
     console.log("FROENTEND DATA RECEIVED:", req.body);

   try{
       const { email, password } = req.body;

        const user = await users.findOne({
            $or: [{ email: email }, { mobile: email }]
        });

       if (user && user.password === password && user.type === 'User') {
           const token = jwt.sign(
             {id: user.userId},
             process.env.JWT_SECRET,
             {expiresIn: "1d"}
            );
           return res.status(200).json({
               success: true,
               message: "Login successfull...",
               token,
               user: {
               	    userId: user.userId,
                    name: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    address: user.address,
                    user_image: user.user_image
                }
           });
       }else{
          return res.status(400).json({
               success: false,
               message: "Invalid Email or Password",
           });
       }
   }catch(error){
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
   }
}