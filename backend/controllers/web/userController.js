import jwt from "jsonwebtoken";
import fs from "fs";
import users from "../../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const { id } = req.query; 

        if (id) {
            const user = await users.findOne({ userId: id, type: "User" });
            
            if (!user) {
                return res.status(404).json({ 
                    success: false, 
                    message: "User not found"
                 });
            }
            return res.status(200).json(user);
        } else {
            const allUsers = await users.find({ type: "User" });
            return res.status(200).json(allUsers);
        }
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
}
