import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import {TextField,Alert } from '@mui/material';
import { motion } from "framer-motion";
const Login = () => {
  const [input,setInput]= useState({
    username: '',
    password: '',
  });
  useEffect(()=>{
    QC.Login({
      btnId:"qqLoginBtn",	//插入按钮的节点id
      size:"A_XL",
  },(reqData, opts)=>{
   console.log(opts)
  });
  },[])
  const [err,setErr] = useState('')
  const  { login } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleRegister = (e) => {
    e.preventDefault()
    navigate('/register');
  }
  const handlelogin = async (e) => { 
    e.preventDefault()

    try{
      await login(input)
      navigate('/');
    }catch(err){
      console.log(err.response)
      setErr(err.response.data.message)
    }
  }
  const qqLogin = ()=>{
    const res = QC.Login.showPopup( { appId:"102075120", redirectURI:"https://tosuke.top/login" })
   
  }
 
  return (
    <div className='auth'>
      
      <motion.div
      className="auth"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01]
      }}
    >
      <h1>登录</h1> 
    <form action="">
    <div>
        <TextField id="standard-basic" label="用户名" variant="standard" name='username' onChange={handleChange}/>
    </div>
    <div>
    <TextField id="standard-basic" label="密码" variant="standard" onChange={handleChange} name='password'  type="password"/>
    </div>
    <div className='buttons'>
    <button onClick={handlelogin}>登录</button>
    <button onClick={handleRegister}> 点击注册</button>
    <div id='qqLoginBtn' className='qqLoogin' > <img src="../qq.png" alt="" /></div>
    </div>
    {/* <span> 还没有账户？<Link to={"/register"}>点击注册 </Link></span> */}
  </form> </motion.div>
      <div> {err && <Alert severity="error">{err}</Alert>}</div>
      
    </div>
  )
}

export default Login
