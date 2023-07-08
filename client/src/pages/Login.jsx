import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <div>
            <div className='input-text'>用户名</div>
            <input type="text" placeholder='用户名' />
        </div>
        <div>
        <div  className='input-text'>密码</div>
        <input type="password" placeholder='密码' /> 
        </div>
        <button>登录</button>
        <p>出现错误</p>
        <span> 还没有账户？<Link to={"/register"}>点击注册 </Link></span>
      </form>
    </div>
  )
}

export default Login
