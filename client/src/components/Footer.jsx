import React from 'react'
import Logo from '../img/logo.jpg'
import mask from '../img/1.png'
const Footer = () => {
  return (
   <footer>
      <div className='mask'>
       <a href="https://beian.miit.gov.cn/">蜀ICP备2023031265号</a>
       <div className='icon'>
       <img src={mask} alt="" />
       <a href="https://beian.mps.gov.cn/#/query/webSearch?code=51142102511585\" rel="noreferrer\" target="_blank\">川公网安备51142102511585</a>
       </div>

       </div>
       <div className='footer'>
       <img src={Logo} />
        <span> ReDawn-Studio 敬上 </span>
       </div>
   </footer>
  )
}

export default Footer
