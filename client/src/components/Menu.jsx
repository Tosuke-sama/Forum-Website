import React from 'react'

const Menu = () => {
    const posts = [
        {
          id: 1,
          title: 'Post 1',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
        },
        {
          id: 2,
          title: 'Post 2',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
        },
        {
          id: 3,
          title: 'Post 3',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
        },
        {
          id: 4,
          title: 'Post 4',
          desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
          img: "https://s3.bmp.ovh/imgs/2023/06/12/a69ebf2991164207.jpg"
        }
      ]
  return (
    <div className="menu">
      <h1> 或许可以看看</h1>
      {posts.map((post) => (
            <div className="post" key={post.id}>
                <img src={post.img} alt="" />
                <h2>{post.title}</h2>
                <button> 阅读更多 </button>
            </div>
      )) }
    </div>
  )
}

export default Menu
