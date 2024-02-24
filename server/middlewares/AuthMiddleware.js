import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js";
import { jsonGenerator} from "../utils/helper.js";
import Jwt  from "jsonwebtoken";

const Authmiddleware = (req, res,next) =>{
  if(req.headers['auth'] == undefined){
    return res.json(jsonGenerator(StatusCode.AUTH_EROOR, "Access Denied"));
  }
  const token =  req.headers['auth'];
 try {
    const decodeed =  Jwt.verify(token, JWT_TOKEN_SECRET);
    console.log(decodeed);

    req.userId = decodeed.userId;
    return next();

 } catch (error) {
    return res.json(jsonGenerator(StatusCode.UNPROCESSABLE_ENTITY, "Invalid token"))
 }
}

export default Authmiddleware;
