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
          <Link to="/"> 
          <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=normal"><h6>日常</h6></Link>
          <Link className='link' to="/?cat=study"><h6>学习</h6></Link>
          <Link className='link' to="/?cat=time"><h6>时间</h6></Link>
          <Link className='link' to="/?cat=world"><h6>世界</h6></Link>
          <Link className='link' to="/?cat=adventure"><h6>冒险</h6></Link>
          <span className='link'> {currentUser?.username}</span>
          {currentUser.img?<img src={`../avater/${currentUser.img}`} alt="" />:""}
          {currentUser? <span className='link' onClick={logout}> 注销</span>:<Link className='link' to="/login">登录</Link>}
          <span className='Write'> <Link className='link' to='/write'>写文章</Link>  </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
