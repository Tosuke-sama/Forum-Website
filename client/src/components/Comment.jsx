import React from 'react'
import {TextField,Alert,Button } from '@mui/material';
const list = [{
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
const Comment = () => {
    return (
        <div>
            <div className='c_write'>
            <TextField className='textfield' id="standard-basic" label="评论" variant="outlined" />
            <Button className='button' variant="contained">发表</Button>
            </div>
        <div className='allCommten'>
            {list.map((item) => (
                <div className='commten'>
                    <div className='commenter'>
                        <div className='info'>
                            <img className='' src="../avater/16894994079786.png" alt="" />
                            <div className='name'> {item.name}</div>
                            <div className='time'> {item.time}</div>
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
