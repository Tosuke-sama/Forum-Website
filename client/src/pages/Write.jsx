import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.content||'');
  const [title, setTitle] = useState(state?.title||'');
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.cat||'');

  const navigate = useNavigate();
  
  const upload = async ()=>{
    try{
      const formData = new FormData();
      formData.append('file',img);
      const res = await axios.post('/upload',formData);
      return res.data
    }catch(err){
      console.log(err)
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const handleSubmit = async (e) => {
    if(title===""||value===""){
      alert("标题和内容不能为空");
      return;
    } 
    if(img!=null){
      if(img.type !== "image/jpeg" && img.type !== "image/png" && img.type !== "image/jpg"){
        alert("图片格式不正确");
        return;
      }
    }
    else return;
     const imgUrl = await upload();
     try {
      state ? await axios.put(`/posts/${state.id}`,{
        title,
        desc:value.slice(0,50)+"...",
        content:value,
        cat,
        img:imgUrl!= null ? imgUrl : ""
      }): await axios.post('/posts/',{title, desc:value.slice(0,50)+"...",content:value,cat, img:imgUrl!= null ? imgUrl : "",date:moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")});
      navigate('/');
     } catch (error) {
      console.log(error);
     }

  }

  return (
    <div className='add content'>
      <div className="content">
       <input type="text" placeholder='Title' onChange={e=>setTitle(e.target.value)} value={title} required />
      <div className="editorContent">
      <ReactQuill className='editorContainer' modules={modules} theme="snow" value={value} onChange={setValue} required />
      </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>发布</h1>
          <span> <b> 状态：</b> 草稿 </span>
          <span> <b> 可见性：</b> 公开 </span>
          <span><b>封面图像：</b></span>
          <input type="file" name='' id='file' onChange={e=>setImg(e.target.files[0])}/>
          <div className="buttons">
            <button> 保存为草稿 </button>
            <button onClick={handleSubmit}> 发布 </button>
          </div>
        </div>
        <div className="item">
          <h1>分类</h1>
          <div className="cat">
          <input type="radio" checked={ cat === "normal"} name='cat' id='normal'  onChange={e=>setCat(e.target.id)} />
          <label htmlFor="normal"> 日常 </label>
          </div>
          <div className="cat">
          <input type="radio" checked={ cat === "study"} name='cat' id='study'  onChange={e=>setCat(e.target.id)} />
          <label htmlFor="study"> 学习 </label>
          </div>
          <div className="cat">
          <input type="radio" checked={ cat === "time"} name='cat' id='time'  onChange={e=>setCat(e.target.id)}/>
          <label htmlFor="time"> 时间 </label>
          </div>
          <div className="cat">
          <input type="radio" checked={ cat === "world"} name='cat' id='world'  onChange={e=>setCat(e.target.id)}/>
          <label htmlFor="world"> 世界 </label>
          </div>
          <div className="cat">
          <input type="radio" checked={ cat === "adventure"} name='cat' id='adventure'  onChange={e=>setCat(e.target.id)}/>
          <label htmlFor="adventure"> 冒险 </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
