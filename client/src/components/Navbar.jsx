import React from 'react'
import Logo from '../img/logo.jpg'
import {Link} from 'react-router-dom'
const Navbar = () => {
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
          <span> Tosuke</span>
          <span className=''> loginout</span>
          <span className='Write'> <Link className='link'>写文章</Link>  </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
