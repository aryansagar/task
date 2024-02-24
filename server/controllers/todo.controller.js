import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";
import User from "../models/User.js";
import { StatusCode } from "../utils/constant.js";
import { jsonGenerator } from "../utils/helper.js";

export const createTodo = async (req,res) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerator(StatusCode.VALIDATION_ERROR,"todo is required",error.mapped()))
    }
    try {
        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
        });

        if(result){
            const user = await User.findOneAndUpdate({_id: req.userId},
                {
                    $push:{todos:result}
                });
                return res.json(jsonGenerator(StatusCode.SUCCESS,"Todo created Successfully", result))
        }
    } catch (error) {
        return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY,"Something went wrong", error))
    }
}
