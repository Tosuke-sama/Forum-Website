import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {TextField,Alert } from '@mui/material';

axios.defaults.baseURL='http://47.109.110.1:3000/api';
axios.defaults.withCredentials=true
const register = () => {
  const [input,setInput]= useState({
    username: '',
    email: '',
    password: '',
  });
  const [err,setErr] = useState('')
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

  const upload = async ()=>{
    if(img!=null){
      if(img.type !== "image/jpeg" && img.type !== "image/png" && img.type !== "image/jpg"){
        return;
      }
    }
    try{
      const formData = new FormData();
      formData.append('file',img);
      const res = await axios.post('/upload/avater',formData);
      return res.data;
    }catch(err){
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const register = async (e) => { 
    e.preventDefault()
    if(input.email===''||input.password===''||input.username===''){
      setErr('请填写完整信息')
      return;
    }
    try{
      const imgUrl = await upload();
      const res = await axios.post('/auth/register',{...input,imgUrl});
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
            <TextField id="standard-basic" label="用户名" variant="standard" name='username' onChange={handleChange}/>
        </div>
        <div>
        <TextField id="standard-basic" label="电子邮件" variant="standard" name='email' onChange={handleChange}/>
        </div>
        <div>
        <TextField id="standard-basic" label="密码" variant="standard" onChange={handleChange} name='password'  type="password"/>
        </div>
        <div>
        <div className='input-text'>头像</div>
        <input required type='file'  onChange={e=>setImg(e.target.files[0])} /> 
        </div>
        <button onClick={register}>注册</button>
        <span> 已拥有账户？<Link to={"/login"}>点击登录</Link></span>
      </form>
     <div> {err && <Alert severity="error">{err}</Alert>}</div>
    </div>
  )
}

export default register
