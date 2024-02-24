import { mongoose } from "mongoose"

const userSchema = mongoose.Schema({
   email:{
    type: String,
    min: 6,
    max: 32,
    require: true,
   },
   todos:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Todo",
   }],
   password:{
    type: String,
    min: 6,
    max: 32,
    required: true,
   },
 
   date:{
     type: Date,
     default: Date.now,
   }
})

const User = mongoose.model('User', userSchema); 

export default User;