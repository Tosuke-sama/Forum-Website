import db from '../db.js';
import jwt from 'jsonwebtoken';
export const getPosts = (req, res) => {
    const q = req.query.cat?"SELECT * FROM posts WHERE cat = ?":"SELECT * FROM posts";
    db.query(q,req.query.cat,(err,result)=>{
        if(err) return res.json(err)
        res.status(200).json(result);
    })
   
}
export const getPost = (req, res) => {
    const q = "SELECT p.id,`username`,`title`,`uid`,`desc`,p.img,`cat`,`date`,`content`,u.img AS userImg FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?";
    db.query(q,req.params.id,(err,result)=>{
        if(err) return res.status(500).json(err)
        res.status(200).json(result[0]);
    })

}

export const addPost = (req, res) => {
    res.json({ message: "Post added successfully" });
}
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if(!token) return res.status(401).json({message:"请先登录"})
    jwt.verify(token,"Tosuke",(err,decoded)=>{
        if(err) return res.status(401).json({message:"请先登录"})
        const q = "DELETE FROM posts WHERE id = ?";
        db.query(q,req.params.id,(err,userInfo)=>{
            if(err) return res.status(500).json({message:"Token验证失败"})
            const q = "DELETE FROM posts WHERE id = ? AND uid = ?";
            const postId = req.params.id;

            db.query(q,[postId,userInfo.id],(err,res1)=>{
                if(err) return res.status(500).json({message:"你不能删除别人的文章"})
                res.status(200).json({message:"删除成功"})
            })
            
        })
    })

}
export const updatePost = (req, res) => {
    res.json({ message: "Post added successfully" });
}