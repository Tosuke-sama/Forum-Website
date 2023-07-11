import db from '../db.js'
import bcrypt from 'bcryptjs'

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";
    const { username, email, password } = req.body;
    db.query(q, [email, username], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            if (result.length > 0) {
                res.json({ message: "User already exists" });
            }
            else {
                const q = "INSERT INTO users VALUES ?";
                //get salt and hash
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                const user = { username, email, hash };
                
                db.query(q, user, (err, result) => {
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
    res.json({ message: "login successfully" });
}
export const loginout = (req, res) => {
    res.json({ message: "loginout successfully" });
}