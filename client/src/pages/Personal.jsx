import React,{useContext,useState,useEffect,useRef} from 'react'
import { AuthContext } from '../context/authContext'
import axios from "axios"
import { motion } from "framer-motion";
import ReactHtmlParser from 'react-html-parser';
import { Link, useLocation } from 'react-router-dom'
import lec3d from "@trickle/lec3d";

const Personal = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
//   const [userId,setUserId] = useState();
  const mountElmt = useRef()
  const userId = location.pathname.split('/')[2];
  useEffect(()=>{
    const { scene, renderer, camera, mountTo, refresh, addControls } = lec3d.init({
    });
    console.log(camera.position)
    camera.position.x = 0
    camera.position.y = 50
    camera.position.z = 250
    addControls({
      callback:(scene,camera)=>{
        console.log(camera.position)
      }
    })
    lec3d.loadFBX({
      modelPath: "../model/mythra.fbx",
      options: {
        scale: 0.01,
        position: {
          x: 0,
          y: 0
        }, 
        animation:{
          index:1
        }
      },
      callback: (FBX,animationStart) => {
        // camera.lookAt(model.position)
        animationStart()
        scene.add(FBX);
        // camera.lookAt(...FBX.position)
      },
    });
    mountTo(mountElmt.current)
    return ()=>{
      scene.clear()
    }
  },[])

  useEffect(() => {
    // console.log(userId)
    //获得用户文章
    //TODO：用户文章查询
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts?cat=adventure`)
        // console.log(res.data)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [userId])
  return (
    <div className='personal'>
      {currentUser? <img src={"../avater/" + currentUser?.img} alt="" />:<img src={"../avater/default.jpg"} alt="" />}
      {currentUser? <div className='personalName'>{currentUser?.username}</div>:<div className='personalName'>{"登录一下吧"}</div>}
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
        <div ref={mountElmt} className='lec3d'></div>
    </div>
  )
}

export default Personal
