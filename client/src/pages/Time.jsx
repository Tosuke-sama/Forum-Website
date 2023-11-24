import React, { useEffect, useRef, useState,useContext } from 'react'
import Popup from '../components/Popup.jsx';
import { motion } from "framer-motion";
import axios from 'axios'
import {TextField,Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { zhCN } from '@mui/x-date-pickers/locales'
import { Snackbar } from '@mui/material';
import { AuthContext } from '../context/authContext'
import moment from 'moment';
const Time = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const datas = [{ id: 1, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" }, { isImg: true },
  { id: 2, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 3, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 4, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 5, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 6, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 7, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 8, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 9, isImg: false, time: "2001-06-01", thing: "天之降任也", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  { id: 10, isImg: false, time: "2001-2023", thing: "Model for generating highly dimensional, mostly numeric, tabular data", content: "generating highly dimensional, mostly numeric, tabular data", end: "thank you!" },
  ]

  const [isPopup, setIsPopup] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  const [content, setContent] = useState(null);
  const [isJoinShow,setIsJoinShow] = useState(false);
  const [err,setErr] = useState({
    open:false,
    msg:"",
    status:"error"
  })
  const [input,setInput]= useState({
    time: '',
    thing: '',
    content: '',
    ending:""
  });
  const [img, setImg] = useState(null);
  //初始化数据
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const res = await axios.get(`/auth/times`)
        setData(res.data)
        console.log(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  },[])
  // useEffect(() => {
  //   // 在 content 更新后设置 isPopup 为 true
   
  // }, [content])

  const handleClick = (e,item) => {
    e.stopPropagation();
   console.log(e,item)
    let time = item?.time.slice(0,9)
    let content = {
      title: time,
      title2: item.thing,
      explain: item.content,
      ending: item.ending,
      url:item.url
    }
    console.log(content)
    setContent(content);
    setIsPopup(true);
  }
  const upload = async ()=>{
    if(img!=null){
      if(img.type !== "image/jpeg" && img.type !== "image/png" && img.type !== "image/jpg"){
        return;
      }
    }
    try{
      const formData = new FormData();
      formData.append('file',img);
      const res = await axios.post('/upload/time',formData);
      return res.data;
    }catch(err){
      console.log(err)
    }
  }

  const handlePopup = () => {
    setIsPopup(false)
  }
  const hanleJoin = ()=>{
    if(currentUser)
    setIsJoinShow(true);
    else
    setErr({open:true,msg:'请先登录',status:"error"})
  }
  const handleChange = (e)=>{
    if(!e.target){
      e.target = {
        name:"time",
        value:moment(e.$d).format("YYYY-MM-DD HH:mm:ss")
      }
    }
    console.log(e.target.name)
    setInput(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleCanleJoin = ()=>{
    setIsJoinShow(false)
  }
  const handleJoinCom = async (e)=>{
      e.preventDefault();
    //  e.stopPropagation();
    if(input.time===''||input.thing===''||input.content===''){
      setErr({open:true,msg:'请填写完整信息',status:"error"})
      return;
    }
    if(input.thing.length>35){
      setErr({open:true,msg:'简述过长！',status:"error"})
      return;
    }
    try{
      const url = await upload();
      console.log(url)
      const res = await axios.post('/auth/time',{...input,url});
     if(res.status===200){
      setErr({open:true,msg:"信息已流向时间线",status:"success"})
      setTimeout(() => {
        setIsJoinShow(false)
      }, 1200);
     
     }
    }catch(err){
      console.log(err)
      setErr({open:true,msg:err.response.data.message,status:"error"})
    }
  }
  return (
    <div className='timeContarin'>
      <div className='timeBody'>
        <div className='timesBox'>
          <div className='times'>
            <ul className={`card-list ${isHovered ? 'pause-animation' : ''}`} >
              {data.map((item,index) => (
                <li key={item.id} onClick={(e) => (index>=5?handleClick(e,data[index-5]):"")} onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                  {item? <div class="card"  onClick={(e) => (handleClick(e,item))}><a>
                    <span className='timeTitle'>{item.time.slice(0,9)}</span>
                    <span className='timeContent'>{item.thing}</span>
                  </a></div> : <div class="card"><a href="">
                    <img src="./05.gif" alt="" />
                  </a></div>}
                </li>
              ))}
            </ul>
            <div className="last-circle"></div>
            <div className="second-circle"></div>
          </div>
          <div className="mask"></div>
          <div className="center-circle"></div>
        </div>
      </div>
      <div className='timeButon'>
        <button onClick={hanleJoin}>加入时间线</button>
      </div>
      {isJoinShow&&<motion.div
        className='popup'
        initial={{ opacity: 0, scale: 0.5 }}
        // animate={{ opacity: 1, scale: 1 }}
        animate={isJoinShow ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{
          duration: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <form action="">
          <div className="datePicker">
            {/* <TextField fullWidth id="standard-basic" label="时间" variant="standard" name='time' onChange={handleChange} /> */}
            <LocalizationProvider  dateAdapter={AdapterDayjs} adapterLocale="zh-cn" localeText={zhCN.components.MuiLocalizationProvider.defaultProps.localeText} key={"zh-cn"} >
      <DatePicker  label="时间" name='time'  onChange={handleChange}  />
    </LocalizationProvider>
          </div>
          <div>
            <TextField  fullWidth id="standard-basic" label="简述" variant="standard" onChange={handleChange} name='thing'  />
          </div>
          <div>
          <TextField
          id="outlined-multiline-static"
          fullWidth
          label="事件"
          multiline
          rows={4}
          variant="standard"
          name='content'
          onChange={handleChange}
        />
          </div>
          <div>
            <TextField fullWidth id="standard-basic" label="结尾语" variant="standard" onChange={handleChange} name='ending'  />
          </div>
          <input type="file" name='' id='file' onChange={e=>setImg(e.target.files[0])}/>
          <div className='buttons'>
            <button onClick={handleJoinCom}>投入时间线</button>
            <button onClick={handleCanleJoin} id='canle'>取消</button>
          </div>
          {/* <span> 还没有账户？<Link to={"/register"}>点击注册 </Link></span> */}
        </form>
        <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={err.open}
        autoHideDuration={3300}
        onClose={() => { setErr({open:false,msg:"",status:"error"}) }}
      >
        <Alert severity={err.status} sx={{ width: '80%' }}>
         {err?.msg}
        </Alert>
      </Snackbar>
      </motion.div>}
      <Popup click={handlePopup} isShow={isPopup} content={content}></Popup>
    </div>
  )
}

export default Time
