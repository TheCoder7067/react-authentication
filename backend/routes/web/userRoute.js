import express from "express";
import multer from "multer";
import path from "path";
import { Signup, Login } from "../../controllers/web/authController.js";
import { getUsers,updateUser, deleteUser } from "../../controllers/web/userController.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/users/"); 
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });

router.post('/signup', upload.single("user_image"), Signup);
router.post('/login', Login);
router.get('/getUsers', getUsers);
router.put('/users/update/:id', upload.single("user_image"), updateUser);
router.delete('/users/delete/:id', deleteUser);

export default router;