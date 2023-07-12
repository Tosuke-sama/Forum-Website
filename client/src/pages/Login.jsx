import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

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
