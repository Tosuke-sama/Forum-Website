import React from 'react'

const Time = () => {
    const datas = [{id:1,isImg:false,time:"2001-2023",thing:"Model for generating highly dimensional, mostly numeric, tabular data"},{isImg:true},{id:2,isImg:false,time:"2001-2023",thing:"Model for generating highly dimensional, mostly numeric, tabular data"},{id:3,isImg:false,time:"2001-2023",thing:"Model for generating highly dimensional, mostly numeric, tabular data"}]
    return (
        <div className='timeContarin'>
    <div className='timeBody'>
    <div className='timesBox'>
      <div className='times'>
        <ul className='card-list' >
        {datas.map((item)=>(
            <li key={item.id}>
            {!item.isImg?<div class="card"><a href="">
                    <span>{item.time}</span>
                    <span>{item.thing}</span>
                </a></div>:<div class="card"><a href="">
                            <img src="./05.gif" alt=""/>
                        </a></div>}
        </li>
        ))}
        </ul>
        <div class="last-circle"></div>
        <div class="second-circle"></div>
      </div>
      <div class="mask"></div>
        <div class="center-circle"></div>
    </div>
    </div>
    </div>
  )
}

export default Time
