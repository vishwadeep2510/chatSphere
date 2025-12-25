import "dotenv/config";
import express from "express"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;


app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin:'https://chat-sphere-ivory-three.vercel.app',
    credentials: true
};
app.use(cors(corsOption)); 

app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
app.get('/', (req, res)=>{
    res.send("hello from the backend!");
})

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listening at port: ${PORT}`);
});

