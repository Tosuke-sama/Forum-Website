import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Write = () => {
  const [value, setValue] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }
  return (
    <div className='add'>
      <div className="content">
       <input type="text" placeholder='Title' />
      <div className="editorContent">
      <ReactQuill className='editorContainer' modules={modules} theme="snow" value={value} onChange={setValue} />
      </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>发布</h1>
          <span> <b> 状态：</b> 草稿 </span>
          <span> <b> 可见性：</b> 公开 </span>
          <input type="file" name='' id='file' />
          <div className="buttons">
            <button> 保存为草稿 </button>
            <button> 更新 </button>
          </div>
        </div>
        <div className="item">
          <h1>分类</h1>
          <div className="cat">
          <input type="radio" name='cat' id='normal'/>
          <label htmlFor="normal"> 日常 </label>
          </div>
          <div className="cat">
          <input type="radio" name='cat' id='study'/>
          <label htmlFor="study"> 学习 </label>
          </div>
          <div className="cat">
          <input type="radio" name='cat' id='time'/>
          <label htmlFor="time"> 时间 </label>
          </div>
          <div className="cat">
          <input type="radio" name='cat' id='world'/>
          <label htmlFor="world"> 世界 </label>
          </div>
          <div className="cat">
          <input type="radio" name='cat' id='adventure'/>
          <label htmlFor="adventure"> 冒险 </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
