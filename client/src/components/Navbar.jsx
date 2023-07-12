import React,{useContext} from 'react'
import Logo from '../img/logo.jpg'
import {Link} from 'react-router-dom'
import{ AuthContext} from '../context/authContext'
const Navbar = () => {
  const  { currentUser ,logout} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <div className="links">
          <Link className='link' to="/?cat=savor"><h6>鉴赏</h6></Link>
          <Link className='link' to="/?cat=collection"><h6>收藏</h6></Link>
          <Link className='link' to="/?cat=exhibition"><h6>展览</h6></Link>
          <Link className='link' to="/?cat=artist"><h6>艺术家</h6></Link>
          <Link className='link' to="/?cat=about"><h6>关于</h6></Link>
          <span> {currentUser?.username}</span>
        {currentUser? <span className='' onClick={logout}> 注销</span>:<Link className='link' to="/login">登录</Link>}
          <span className='Write'> <Link className='link'>写文章</Link>  </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
