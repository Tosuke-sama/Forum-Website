import React, { useState } from 'react'
import { motion } from "framer-motion";
import popup from '../img/popup.jpg'
import './component.scss'
const Popup = (props) => {
    let { click, isShow } = props
    console.log(  isShow)
    const [Show, setIsShow] = useState(isShow!="false")
    console.log(Show)
    const handleClickMed = () => {
        click()
        setIsShow(false)
    }
    console.log( Show,Show&&666)
    return (
        Show&&<motion.div
            className='popupbox'
            initial={{ opacity: 0, scale: 0.5 }}
            // animate={{ opacity: 1, scale: 1 }}
            animate={Show ? { opacity: 1, scale: 1 } : {opacity: 0, scale: 0}}
            transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <div className='title'>好久不见</div>
            <div>~欢迎来到京介的怪谈小屋~</div>
            <div className='text'>此为京介个人记录的站点，京介也赞成大家写下自己的观点或者建议</div>
            <div>祝你过得开心！</div>
            <img src={popup} alt="" />
            <div className='btn' onClick={handleClickMed}>好的</div>
        </motion.div>
    )
}

export default Popup
