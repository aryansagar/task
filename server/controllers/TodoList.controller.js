import User from "../models/User.js"
import { StatusCode } from "../utils/constant.js";
import { jsonGenerator } from "../utils/helper.js";

export const getToDos = async (req,res) =>{
    try {
     const list  = await User.findById(req.userId)
     .select("-password")
     .populate('todos')
     .exec();

     return res.json(jsonGenerator(StatusCode.SUCCESS,"All todo list",list))
    } catch (error){
        return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY,"Error",error))
    }
}