import db from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const register = (req, res) => {
    //查看用户是否存在
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    const { username, email, password,imgUrl } = req.body;
    db.query(q, [email, username], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            if (result.length > 0) {
                res.status(409).json({ message: "用户已存在！" });
            }
            else {
                const q1 = "INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?)";
                //将密码进行加密
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const user = [username, email,hash]   //user is an array of values to be inserted in the table;
                console.log(req.body)
                db.query(q1,[[username, email,hash,imgUrl]], (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        res.status(200).json({ message: "register successfully" });
                    }}
                )
                };
            }
        })
 
    
}

export const login = (req, res) => {
    //查看用户是否存在
    const q = "SELECT * FROM users WHERE username = ?";
    const { username, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = [username, hash] 

    db.query(q, username, (err, result) => {
        if(err) res.json(err)
        if(result.length === 0) {
            res.status(409).json({"message":"用户名或密码错误"})
            console.log(result)
        }
        else{
           const ispasswordCurrent = bcrypt.compareSync(password, result[0].password)
              if(!ispasswordCurrent) {
                res.status(404).json({"message":"用户名或密码错误"})
              }else{
                const {password,...others} = result[0]
                //用户验证成功，生成token
                const token = jwt.sign({id:result[0].id},"Tosuke")
                //将token存储在cookie中
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
                res.setHeader('Access-Control-Allow-Credentials', 'true');
                res.cookie("access_token",token,{
                    httpOnly:true,
                }).status(200).json(others)
              }

        }
    })
}
export const logout = (req, res) => {
    res.clearCookie("access_token",{
        // sameSite:"none",
        // secure:true,
    }).status(200).json({ message: "loginout successfully" });
}

export const time = (req, res) => {
    const { time, thing, content,ending,url } = req.body;
    const q1 = "INSERT INTO time(`time`,`thing`,`content`,`ending`,`url`) VALUES (?)";
    db.query(q1,[[time, thing, content,ending,url]], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json({ message: "register successfully" });
        }}
    )
    
}
export const times = (req, res) => {
    const q = "SELECT * FROM time ORDER BY RAND(id) LIMIT 10";
    db.query(q,req.query.cat,(err,result)=>{
        if(err) return res.json(err)
        res.status(200).json(result);
    })
   
}