import {validationResult}  from "express-validator";
import User from "../models/User.js"
import { jsonGenerator } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

const Login = async (req,res) =>{
    const errors = validationResult(req);
    if(errors.isEmpty()){
       const {email,password } = req.body;
       const user = await User.findOne({email:email})
       if(!user){
       return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "email or password is incorrect"))
       }
       const verified = bcrypt.compareSync(password, user.password);
       if(!verified){
        return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "email or password is incorrect"))
       }
       const token = Jwt.sign({userId: user._id},JWT_TOKEN_SECRET);
       return res.json(jsonGenerator(StatusCode.SUCCESS, "lOGIN Successful",{userId: user._id,token:token}))
    }
    res.json(jsonGenerator(StatusCode.VALIDATION_ERROR,"Validation error", errors.mapped()))
}

export default Login;