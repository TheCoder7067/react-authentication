import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    type:{
    	type: String,
    	enum: ['Admin','User'],
    	default: 'User',
    	required: true
    },
    name:{
    	type: String,
    	required: true
    },
    mobile:{
    	type: String,
    	required: true,
    	unique: true
    },
    email:{
    	type: String,
    	required: true,
    	unique: true,
    	lowercase: true
    },
    password:{
    	type: String,
    	required: true,
    },
    address:{
    	type: String
    },
    dob:{
    	type: Date
    },
    gender:{
    	type: String,
    },
    user_image:{
    	type:String,
    	default: ""
    },
    status:{
    	type: Number,
    	default: 1
    }
}, {timestamps: true});

const userModel = mongoose.model('User', userSchema);
export default userModel