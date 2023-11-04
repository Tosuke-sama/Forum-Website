import express  from "express";
import postrouter from "./routes/posts.js";
import authrouter from "./routes/auth.js";
import userrouter from "./routes/users.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import https from 'https'
import multer from 'multer';
import fs from 'fs'

const allowedOrigins = [
  'http://localhost:5173',
  'http://example.com', // 添加更多的允许的跨域源
  'http://anotherdomain.com',
  'https://tosuke.top'
];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials: true
}))
app.use("/api/auth",authrouter);
app.use("/api/user",userrouter);
app.use("/api/posts",postrouter);

var options = {
  key:fs.readFileSync('./keys/privkey.key'),
  cert:fs.readFileSync('./keys/fullchain.pem')
}
var httpsServer = https.createServer(options,app);

const storageImg = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname )
    }
  })
  const storageAvater = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/avater')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname )
    }
  })
  
  const upload = multer({ 
    storage:storageImg
})
  const uploadAvater = multer({ 
  storage:storageAvater
})

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})
//文章图片上传
app.post('/api/upload/avater', uploadAvater.single('file'), (req, res) => {
  const file = req.file
  res.status(200).json(file.filename)
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})
// httpsServer.listen(3000,(req,res)=>{
//   console.log("Server is running at port 3000");
// })
app.listen(3000,(req,res)=>{
    console.log("Server is running at port 3000");
})