import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

//routes
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";

const app = express();
dotenv.config();

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(bodyParser.json({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


//use routes
app.use("/auth", AuthRoute);
app.use("/profile", UserRoute);

mongoose
    .connect(
        process.env.Mongo_DB, {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(()=>console.log("DB connected Succesfully"));

app.listen( process.env.PORT, function () {
    console.log(`server has been started on port ${process.env.PORT}`);
});