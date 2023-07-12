import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {AuthContext,login} from '../context/authContext.js'

const Login = () => {
  const [input,setInput]= useState({
    username: '',
    password: '',
  });
  const [err,setErr] = useState('')
  const {currrentUser} = UseContext(AuthContext)
  console.log(currrentUser)
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handlelogin = async (e) => { 
    e.preventDefault()
    try{
      const res = await login(input)
      
      navigate('/');
    }catch(err){
      console.log(err)
      setErr(err.response)
    }
  }
  return (
    <div className='auth'>
      <h1>登录</h1>
      <form action="">
        <div>
            <div className='input-text' >用户名</div>
            <input type="text" placeholder='用户名' name='username' onChange={handleChange} />
        </div>
        <div>
        <div  className='input-text'>密码</div>
        <input type="password" placeholder='密码' name='password' onChange={handleChange} /> 
        </div>
        <button onClick={handlelogin}>登录</button>
        {err && <p>{err}</p>}
        <span> 还没有账户？<Link to={"/register"}>点击注册 </Link></span>
      </form>
    </div>
  )
}

export default Login
