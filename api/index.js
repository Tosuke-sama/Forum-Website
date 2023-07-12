import express  from "express";
import postrouter from "./routes/posts.js";
import authrouter from "./routes/auth.js";
import userrouter from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use("/api/auth",authrouter);
app.use("/api/user",userrouter);
app.use("/api/posts",postrouter);


app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(3000,(req,res)=>{
    console.log("Server is running at port 3000");
})