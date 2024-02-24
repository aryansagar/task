import express from "express";
import { mongoose } from "mongoose";
import apiRoute, { apiProtected } from "./routes/api.js";
import cors from "cors";
import bodyParser from "body-parser";
import Authmiddleware from "./middlewares/AuthMiddleware.js";
const app = express();

const PORT = 8000;
const db = process.env.MONGO_URL;

mongoose.connect("mongodb+srv://aryansagar1996:aaryan62@cluster0.u8ixfle.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('Mongodb is connected'))

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/',apiRoute);
app.use('/api/', Authmiddleware , apiProtected);
app.listen(PORT, (req,res)=>
  console.log('server is running')
);
