import React,{useState,useEffect} from 'react'
import {TextField,Alert,Button } from '@mui/material';
import moment from 'moment';
import axios from 'axios'
const list1 = [{
    name: 'Tosuke',
    time: '2021-10-10',
    content: '我爱上帝噶客户是否可见哈桑法律框架哈桑啊沙发上激发了是阿斯弗啊沙发沙发阿斯弗阿斯弗阿斯弗阿斯弗啊啊是',
    like: 10
},
{
    name: 'Tosuke',
    time: '2021-10-10',
    content: '我爱上帝噶客户是否可见哈桑法律框架哈桑啊沙发上激发了是阿斯弗啊沙发沙发阿斯弗阿斯弗阿斯弗阿斯弗啊啊是',
    like: 10
},
{
    name: 'Tosuke',
    time: '2021-10-10',
    content: '我爱上帝噶客户是否可见哈桑法律框架哈桑啊沙发上激发了是阿斯弗啊沙发沙发阿斯弗阿斯弗阿斯弗阿斯弗啊啊是',
    like: 10
}
]
const Comment = (postId) => {
    const [content,setContent] = useState('')
    const [isComment,setIsComment] = useState(false)
    const [list,setList] = useState([])
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
    const handleCilck = async () =>{
        if(content === '') return
        try{
            const res = await axios.post("/posts/comment",{content,date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),pid:postId.postId});
            setIsComment(!isComment)
        }catch(err){
            console.log(err)
        }
    }
    const handleChange = (e) =>{
        setContent(e.target.value)
    }
    return (
        <div>
            <div className='c_write'>
            <TextField className='textfield' id="standard-basic" label="评论" variant="outlined" onChange={handleChange} />
            <Button className='button' variant="contained" onClick={handleCilck}>发表</Button>
            </div>
        <div className='allCommten'>
            {list.map((item) => (
                <div className='commten'key={item.cid} >
                    <div className='commenter'>
                        <div className='info'>
                            <img className='' src={"../avater/"+item.userImg} alt="" />
                            <div className='name'> {item.username}</div>
                            <div className='time'> {item.c_date}</div>
                        </div>
                        <div className='like'>
                            {item.like}
                        </div>
                    </div>
                    <div className='c_content'>
                    {item.content}
                    </div>
                </div>

            ))}
        </div>
        </div>
    )
}

export default Comment
