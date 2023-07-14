import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


axios.defaults.baseURL='http://localhost:3000/api';
axios.defaults.withCredentials=true
const register = () => {
  const [input,setInput]= useState({
    username: '',
    email: '',
    password: '',
  });
  const [err,setErr] = useState('')

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const register = async (e) => { 
    e.preventDefault()
    try{
      const res = await axios.post('/auth/register',input)
      navigate('/login');
    }catch(err){
      console.log(err)
      setErr(err.response.data.message)
    }
  }
  return (
    <div className='auth'>
      <h1>注册</h1>
      <form action="">
        <div>
            <div className='input-text'>用户名</div>
            <input required type="text" placeholder='输入用户名' name='username' onChange={handleChange}/>
        </div>
        <div>
        <div  className='input-text'>电子邮件</div>
        <input  required type="text" placeholder='输入电子邮件' name='email' onChange={handleChange} /> 
        </div>
        <div>
        <div  className='input-text'>密码</div>
        <input required type="password" placeholder='输入密码' name='password' onChange={handleChange} /> 
        </div>
        <button onClick={register}>注册</button>
        { err && <p>{err}</p>}
        <span> 已拥有账户？<Link to={"/login"}>点击登录</Link></span>
      </form>
    </div>
  )
}

export default register
