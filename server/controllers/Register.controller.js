import { validationResult } from "express-validator";
import { jsonGenerator } from "../utils/helper.js";
import User from "../models/User.js"
import { StatusCode, JWT_TOKEN_SECRET} from "../utils/constant.js"
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

const Register = async (req,res) =>{
 
    const error = validationResult(req);
    if(error.isEmpty()){
         const {email,password} = req.body;
         const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password,salt);

        const userExist = await User.findOne({
            email:email
        })
       if(userExist){
        return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY,"User or email already exists"))
       }
         try {
            const result =  await User.create({
                email: email,
                password: hashPassword
            })
            const token = Jwt.sign({userId: result._id},JWT_TOKEN_SECRET)
            res.json(jsonGenerator(StatusCode.SUCCESS,"Registration successfull",{userId: result._id,token: token}));
         } catch (error) {
            console.log(error)
         }
    }
    res.json(jsonGenerator(StatusCode.VALIDATION_ERROR,"Validation error",error.mapped()));
   }

export default Register;