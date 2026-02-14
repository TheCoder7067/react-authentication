import express from "express";
import multer from "multer";
import { Signup, Login } from "../../controllers/web/authController.js";
import { getUsers } from "../../controllers/web/userController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/users/" });

router.post('/signup', upload.single("user_image"), Signup);
router.post('/login', Login);
router.get('/getUsers', getUsers);


export default router;