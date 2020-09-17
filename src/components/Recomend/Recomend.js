import "./Recomend.css"
import React ,{useEffect, useState,memo} from 'react'
import {getRecomendData} from '../../api/index'

export default memo(props=>{
   
    const [recomend,setRecomend]=useState(null)
    useEffect(()=>{
        getRecomendData().then(res=>{
            setRecomend(res.data.feed.entry)
        })
    },[])
    const handleClickItem=e=>{
        let index=e.currentTarget.dataset.index
        e.stopPropagation()
        e.preventDefault()
        console.log(recomend[index])
    }
    return (
        <div className="recomend">
            <h2>推荐</h2>
            <div className="recomend-wrapper">
                <ul>
                    {recomend?recomend.map((item,index)=>{
                        return(
                            <li key={item.id.attributes['im:id']} className="recomend-list" onClick={handleClickItem} data-index={index}>
                                <div className="list-image"><img src={item['im:image'][0].label} alt=""></img></div>
                                <div className="list-name">{item.title.label}</div>
                                <div className="list-type">游戏</div>
                            </li>
                        )
                    }):[]}
                </ul>
            </div>
        </div>
    )
},()=>true)