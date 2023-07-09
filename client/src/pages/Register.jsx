import React from 'react'
import { Link } from 'react-router-dom'

const register = () => {
  return (
    <div className='auth'>
      <h1>Login</h1>
      <form action="">
        <div>
            <div className='input-text'>用户名</div>
            <input required type="text" placeholder='用户名' />
        </div>
        <div>
        <div  className='input-text'>电子邮件</div>
        <input  required type="text" placeholder='电子邮件' /> 
        </div>
        <div>
        <div  className='input-text'>密码</div>
        <input required type="password" placeholder='密码' /> 
        </div>
        <button>登录</button>
        <p>出现错误</p>
        <span> 已拥有账户？<Link to={"/login"}>点击登录</Link></span>
      </form>
    </div>
  )
}

export default register
