import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import popup from '../img/popup.jpg'
import './component.scss'
const Popup = ({click, isShow,content}  = props) => {
   
    // const [popupShow,setPopupShow] = useState(isShow)
    // useEffect(()=>{
    //     console.log(props)
    //     setPopupShow(isShow)
    // },[isShow])
    console.log(isShow)
    const handleClickMed = () => {
        click()
    }

    return (
        <motion.div
            className='popupbox'
            initial={{ opacity: 0, scale: 0.5 }}
            // animate={{ opacity: 1, scale: 1 }}
            animate={isShow ? { opacity: 1, scale: 1 } : {opacity: 0, scale: 0}}
            transition={{
                duration: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <div className='title'>{content?.title}</div>
            <div className='title2'>{content?.title2||""}</div>
            <div className='text'>{content?.explain}</div>
            <div className='end'>{content?.ending}</div>
            {content?.url&&<img src={"../timePhoto/" + content?.url} alt="" />}
            <div className='btn' onClick={handleClickMed}>好的</div>
        </motion.div>
    )
}

export default Popup
