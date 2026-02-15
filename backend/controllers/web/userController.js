import jwt from "jsonwebtoken";
import fs from "fs";
import users from "../../models/userModel.js";

export const getUsers = async (req, res) => {
    try {
        const { id } = req.query;
        const BASE_URL = process.env.BASE_URL || "http://localhost:5000/";

        // .lean() use karne se humein plain JS objects milte hain jinhe modify karna easy hai
        if (id) {
            const user = await users.findOne({ userId: id, type: "User" }).lean();
            if (!user) return res.status(404).json({ success: false, message: "User not found" });

            if (user.user_image) user.user_image = BASE_URL + user.user_image;
            
            return res.status(200).json(user);
        }

        const allUsers = await users.find({ type: "User" }).lean();
        
        const formattedUsers = allUsers.map(data => ({
            ...data,
            user_image: data.user_image ? BASE_URL + data.user_image : ""
        }));

        return res.status(200).json(formattedUsers);

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}


export const updateUser = async (req, res) => {

    try {
        const { id } = req.params; 
        const { name, email, mobile, address } = req.body;

        let user = await users.findOne({ userId: id });
        if (!user) {
            return res.status(404).json({
             success: false, 
             message: "User not found" 
           });
        }

        let updateData = { name, email, mobile, address };

        if (req.file) {
            if (user.user_image) {
                if (fs.existsSync(user.user_image)) {
                    fs.unlinkSync(user.user_image);
                }
            }
            updateData.user_image = req.file.path.replace(/\\/g, "/");
        }

        const updatedUser = await users.findOneAndUpdate(
            { userId: id },
            { $set: updateData },
            { returnDocument: 'after' } 
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await users.findOne({ userId: id });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (user.user_image) {
            if (fs.existsSync(user.user_image)) {
                fs.unlinkSync(user.user_image);
            }
        }
        await users.deleteOne({ userId: id });

        return res.status(200).json({
            success: true,
            message: "User and associated image deleted successfully!"
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};