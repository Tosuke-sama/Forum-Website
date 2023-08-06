import React,{useState,useEffect} from 'react'
import {TextField,Alert,Button } from '@mui/material';
import moment from 'moment';
import axios from 'axios';
import { Snackbar} from '@mui/material';
import { motion } from "framer-motion";
const Comment = (postId) => {
    const [content,setContent] = useState('')
    const [ifo,setIfo] = useState({message:'',type:''})
    const [isComment,setIsComment] = useState(false)
    const [list,setList] = useState([])
    const [open,setOpen] = useState(false)
    useEffect(()=>{
        const fetchData = async () => {
          try{
            const res = await axios.get(`/posts/comment/${postId.postId}`)
            console.log(res.data)
            setList(res.data)
          }catch(err){
            console.log(err)
          }
        }
        fetchData();
        
      },[postId,isComment])
    const handleCilck = async (e) =>{
        e.preventDefault()
        if(content === '') {
            setIfo({message:"评论不能为空！",type:"error"})
            setOpen(true)
            return
        }
        try{
            const res = await axios.post("/posts/comment",{content,date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),pid:postId.postId});
            setIfo({message:"评论发表成功！",type:"success"})
            setContent('')
            setIsComment(!isComment)
            setOpen(true)
           
        }catch(err){
            setIfo({message:"请先登录！",type:"error"})
            setOpen(true)
        }
    }
    const handleChange = (e) =>{
        setContent(e.target.value)
    }
    return (
        <div>
            <div className='c_write'>
            <TextField className='textfield' id="standard-basic" value={content} label="评论" variant="outlined" onChange={handleChange} />
            <Button className='button' variant="contained" onClick={handleCilck}>发表</Button>
            </div>
        <div className='allCommten'>
            {list.map((item) => (
                <motion.div
                className=""
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
              >
                <div className='commten'key={item.cid} >
                    <div className='commenter'>
                        <div className='info'>
                            <img className='' src={"../avater/"+item.userImg} alt="" />
                            <div className='name'> {item.username}</div>
                            <div className='time'> {moment(item.c_date).fromNow()}</div>
                        </div>
                        <div className='like'>
                            {"点赞  "+item.like}
                        </div>
                    </div>
                    <div className='c_content'>
                    {item.content}
                    </div>
                </div>
                </motion.div>
            ))}
        </div>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={3300}
        onClose={() => { setOpen(false) }}
      >
        <Alert severity={ifo.type} sx={{ width: '100%' }}>
            {ifo.message}
          </Alert>
      </Snackbar>
        </div>
    )
}

export default Comment
