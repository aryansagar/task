import { check } from "express-validator";

export const RegisterSchema = [
    check('email','email is required').exists().isEmail(),
    check('password','password id required').exists().isLength({min:6, max:100}).trim(),
]