import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { AuthContext } from '../context/authContext'
import { Snackbar,Alert } from '@mui/material';
const Home = () => {
  const { open, currentUser, setOpen } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const cat = location.search;
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
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
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
          </div>
        ))}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3300}
        onClose={() => { setOpen(false) }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
            欢迎回来，{currentUser?.username}，爱来自京介!
          </Alert>
      </Snackbar>
    </div>

  )
}

export default Home
