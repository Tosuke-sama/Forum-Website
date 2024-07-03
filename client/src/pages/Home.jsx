import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { AuthContext } from '../context/authContext'
import { Snackbar, Alert, Skeleton } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import { motion } from "framer-motion";
import Stack from '@mui/material/Stack';
const Home = () => {
  const { open, currentUser, setOpen } = useContext(AuthContext)
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [pageNum,setPageNum] = useState(1);
  const location = useLocation();
  const cat = location.search;
  console.log(cat)
  useEffect(() => {
    setIsLoad(false)
    // console.log(currentUser)
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts${cat}`)
        setAllPosts(res.data)
        console.log(allPosts)
        setPosts(res.data.slice(4*(pageNum-1),4*(pageNum-1)+4))
        setTimeout(() => {
          setIsLoad(true)
        }, 1000);
      
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat])

  const onPageChange = (event,index) => {
    console.log(index)
    setPosts(allPosts.slice(4*(index-1),4*(index-1)+4))
    setPageNum(index)
  }
  return (
    <div className='home content'>
      {isLoad ? <div className="posts">
        {posts.map((post) => (
          <motion.div
            className="post"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
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
      </div> : <div className="posts">{[1,2,3,4].map((post) => (
        <div className="post" >
          <div className="img" >
            <Skeleton variant="rectangular" width={410} height={300} />
          </div>
          <div className="content">
            <Skeleton width="60%" height={60} />
            <div>{[1, 2, 3, 4, 5].map(() => <Skeleton width="80%" height={30} />)}</div>
          </div>
        </div>))}</div>}
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
      <Stack spacing={2} className='Pagination'>
      <Pagination count={10} onChange={ onPageChange } size='large' page={pageNum} />
    </Stack>
    </div>

  )
}

export default Home
