import React,{useEffect,useState,useContext} from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import moment from 'moment'
import {AuthContext} from '../context/authContext'
import axios from 'axios'
import 'moment/dist/locale/zh-cn'
import ReactHtmlParser from 'react-html-parser';
moment.locale('zh-cn')
function Single() {
  const [post,setPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  const  { currentUser } = useContext(AuthContext)
  const navigator = useNavigate();
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[postId])
  moment.locale('zh-cn');

  const handleDelete = async () => {
    try{
      await axios.delete(`/posts/${postId}`)
      navigator("/")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='single content'>
      <div className="content">
       {post.img && <img src={`../upload/${post?.img}`} alt="" />}
        <div className="user">
          <img src={post?.userImg} alt="" />
          <div className="info">
            <span>{post?.username}</span>
            <p> {moment(post.date).fromNow()} 前发布</p>
          </div>
       { currentUser != null? currentUser?.id === post.uid && <div className="edit">
            <Link to="/write?edit=2" state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} onClick={handleDelete} alt="" />
          </div> : null}
        </div>
        <h1>{post.title}</h1>
        <div>
        {ReactHtmlParser(post.content)}
        </div>
      
      </div>
      <div className="menu"><Menu cat={post.cat}></Menu></div>
    </div>
  )
}

export default Single
