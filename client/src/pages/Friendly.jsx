import { frame } from 'framer-motion'
import React, { useEffect, useState,useRef } from 'react'
import { motion } from "framer-motion";
import { displayName } from 'react-quill';

const Friendly = () => {
    const [isHover,setIsHover] = useState([])
    const [ready,setReady] = useState(false)
    const el = []
    const datas = [{id:1,name:"Tosuke",img:"../upload/1.jpg",url:"https://tosuke.gitee.io/",text:"京介的正牌博客"},{id:2,img:"../upload/2.jpg",name:"skyme",url:"https://skym1.gitee.io/",text:"在这里记录着有关与我的一些东西"},{id:3,img:"../upload/3.jpg",name:"LEI",url:"https://thunderstorm2018.gitee.io/leiblog/",text:"雷樱者记录学习历程的网站"}];
    const lists = []
    let iframe = useRef(null);
    useEffect(()=>{
        datas.forEach((item,index)=>{
            lists[index] = false
        })
        setIsHover(lists)

    },[])
   
    const handleMouseEnter = (index)=>{
        lists[index] = true
        setIsHover(lists)
    }
    const handleMouseLeave = (index)=>{
        iframe.current.target.style.display = "none"
        el[index].style.display = "block"
        lists[index] = false
        setIsHover(lists)
      
    }
    const handleClick = (url)=>{
        window.open(url);
    }
    //加载iframe切换样式
    const handleLoad = (e,index)=>{
        iframe.current = e
        e.target.style.display = "block"
        el[index].style.display = "none"
    //    console.log( el[0])
      
    }
    return (
    <div className='friendly'>
     {datas.map((item,index) => (
        <motion.div
        className='item'
        initial={{ opacity: 0, y:-100 }}
        // transition={{
        //   duration: 0.5,
        //   ease: [0, 0.71, 0.2, 1.01]
        // }}
        transfer="true"
        animate={isHover[index]?{ opacity: 1, scale:1.1,y:0 }:{ opacity: 1, y:0,scale:1 }}
        key={item.id} 
        onClick={()=>handleClick(item.url)}
      >
        {/* <div className='item' key={item.id}  ref={el}  onClick={()=>handleClick(item.url)}> */}
            <div className='photo'
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)} 
            onClick={()=>handleClick(item.url)}
            > {isHover[index]&&<iframe onLoad={(e)=>handleLoad(e,index)} src={item.url}  className='iframe'></iframe>}
            <img className='img' src={`${item.img}`} ref={(e)=>{el[index] = e}} alt="" /></div>
            <div className='title'>{item.name}</div>
            <div className='text'> {item.text}</div>
        {/* </div> */}
        </motion.div>
     ))}
    </div>
    
  )
}

export default Friendly
