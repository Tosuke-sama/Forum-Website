import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { AuthContext } from '../context/authContext'
import { Snackbar,Alert } from '@mui/material';
import { motion } from "framer-motion";
const Home = () => {
  const { open, currentUser, setOpen } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const cat = location.search;
  console.log(cat)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat])




  return (
    <div className='home content'>
      <div className="posts">
        {posts.map((post) => (
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
        ))}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3300}
        onClose={() => { setOpen(false) }}
      >
        <Alert severity="success" sx={{ width: '80%' }}>
            欢迎回来，{currentUser?.username}，爱来自京介!
          </Alert>
      </Snackbar>
    </div>

  )
}

export default Home
