import React from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'
function Single() {
  return (
    <div className='single'>
      <div className="content">
        <img src="https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg" alt="" />
        <div className="user">
          <img src="https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg" alt="" />
          <div className="info">
            <span>Tosuke</span>
            <p> 2天前发布</p>
          </div>
          <div className="edit">
            <Link to="/write?edit=2">
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>时间、世界与冒险</h1>
        <p>
          “万物皆有裂痕，是光进来的地方”
          暴雨如期而至。
          <br />
          雨珠打翻了枯叶，搅混了池塘，空中弥漫着泥土的气息，池塘里的鱼群惊慌失措，仿佛因为看不清前途命运而焦躁不安。<br />
          叶瑾介当时也是在这种时候到达新泽的。<br />
          虽说新泽阴雨连绵，很少能够见到阳光，但对于参加过高考的叶瑾介来说，这注定会是他通往梦想的地方。

        </p>
      </div>
      <div className="menu"><Menu></Menu></div>
    </div>
  )
}

export default Single
