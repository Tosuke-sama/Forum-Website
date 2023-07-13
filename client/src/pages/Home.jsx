import React,{useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
const Home = () => {
  const [posts,setPosts] = useState([]);
  const location = useLocation();
  const cat = location.search;
  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[cat])

  // const posts = [
  //   {
  //     id: 1,
  //     title: 'Post 1',
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //     img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
  //   },
  //   {
  //     id: 2,
  //     title: 'Post 2',
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //     img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
  //   },
  //   {
  //     id: 3,
  //     title: 'Post 3',
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //     img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
  //   },
  //   {
  //     id: 4,
  //     title: 'Post 4',
  //     desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  //     img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
  //   }
  // ]



  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h1> { post.title}</h1> 
              </Link>
                <p> {post.desc}</p>
                <button> 阅读更多</button>
               
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
