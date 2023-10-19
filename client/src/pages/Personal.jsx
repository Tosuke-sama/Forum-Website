import React,{useContext,useState,useEffect} from 'react'
import { AuthContext } from '../context/authContext'
import axios from "axios"
import { motion } from "framer-motion";
import ReactHtmlParser from 'react-html-parser';
import { Link, useLocation } from 'react-router-dom'
const Personal = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
//   const [userId,setUserId] = useState();
  const userId = location.pathname.split('/')[2];
  useEffect(() => {
    console.log(userId)
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts?cat=adventure`)
        console.log(res.data)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [userId])
  return (
    <div className='personal'>
       <img src={"../avater/" + currentUser.img} alt="" />
       <div className='personalName'>{currentUser.username}</div>
       <div  className='personalLog'>{`通过JavaScript实现锚点功能可以让页面更加灵活，为用户提供更好的浏览体验。有了上面的代码，你就可以轻松地在你的网站上添加锚点功能了。当然，如果想要更进一步的优化页面效果，你还可以尝试其他的技巧，比如使用缓动函数等。`}</div>
       <div  className='posts'> {posts.map((post) => (
            <motion.div
            className="post"
            initial={{ opacity: 0, scale: 0.5}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            key={post.id}
          >
          {/* <div className="post" key={post.id}> */}
            <div className="img" >
              <Link to={`/post/${post.id}`}>
              <img src={`../upload/${post.img}`} alt="" />
              </Link>
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1> {post.title} </h1>
              </Link>
              <p> {ReactHtmlParser(post.desc)}</p>
              <Link className='link' to={`/post/${post.id}`}>
                <button > 阅读更多</button>
              </Link>
            </div>
          {/* </div> */}
          </motion.div>
        ))} </div>
    </div>
  )
}

export default Personal
