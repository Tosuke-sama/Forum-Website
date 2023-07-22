import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
import {TextField,Alert } from '@mui/material';

const Login = () => {
  const [input,setInput]= useState({
    username: '',
    password: '',
  });

  const [err,setErr] = useState('')
  const  { login } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
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
  return (
    <div className='auth'>
      <h1>登录</h1>
      <form action="">
        <div>
            <TextField id="standard-basic" label="用户名" variant="standard" name='username' onChange={handleChange}/>
        </div>
        <div>
        <TextField id="standard-basic" label="密码" variant="standard" onChange={handleChange} name='password'  type="password"/>
        </div>
        <button onClick={handlelogin}>登录</button>
        <span> 还没有账户？<Link to={"/register"}>点击注册 </Link></span>
      </form>
      <div> {err && <Alert severity="error">{err}</Alert>}</div>
    </div>
  )
}

export default Login
