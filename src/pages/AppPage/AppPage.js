import React, { useEffect, useState } from 'react'
import './AppPage.css'
import { useParams } from 'react-router-dom'
import {getAppList } from '../../api/index'
import { Carousel } from 'antd';

function AppPage(){
    const params=useParams()
    const id=params.id
    const [app,setApp]=useState(null)
    useEffect(()=>{
        getAppList().then(res=>{
            let temp=res.data.feed.entry.filter(item=>item.id.attributes['im:id']===id)
            temp.length===0?setApp(null):
            setApp(temp.length===0?null:temp[0])
        })
    },[id])
    const [moreDetailInfo,setMoreDetailInfo]=useState(false)
    const detailInfoStyle={
        maxHeight: moreDetailInfo?'none':'110px',
        overflow: moreDetailInfo?'':'hidden'
    }
    let detailInfo=null
    if(app){
        detailInfo=app.summary.label.split("。")
    }

    return(
        app?(<div className="xp-app-wrapper">
            <div className="xp-app-header">
                <img src={app['im:image'][0].label} alt=""></img>
                <div>
                    <span style={{fontSize:22}}>{app['im:name'].label}</span>
                    <span style={{fontSize:16,color:'#999999',transform: 'translateY(-10px)'}}>{app.title.label}</span>
                    <div>
                        <span className="pur-btn">获取</span>
                        <span className="pur-tip">App内购买</span>
                    </div>
                </div>
            </div>
            <div className="xp-app-el-info">
                <div className="app-info-item">
                    <div className="app-info-item-top">3.9万个评分</div>
                    <div className="app-info-item-middle">4.7</div>
                    <div className="app-info-item-bottom">五星</div>
                </div>

                <div className="app-info-item">
                    <div className="app-info-item-top">年龄</div>
                    <div className="app-info-item-middle">9+</div>
                    <div className="app-info-item-bottom">岁</div>
                </div>

                <div className="app-info-item">
                    <div className="app-info-item-top">排行榜</div>
                    <div className="app-info-item-middle">#20</div>
                    <div className="app-info-item-bottom">家庭聚会</div>
                </div>

                <div className="app-info-item">
                    <div className="app-info-item-top">开发者</div>
                    <div className="app-info-item-middle">iOS</div>
                    <div className="app-info-item-bottom">LXP</div>
                </div>

                <div className="app-info-item">
                    <div className="app-info-item-top">大小</div>
                    <div className="app-info-item-middle">473</div>
                    <div className="app-info-item-bottom">MB</div>
                </div>
            </div>
            <div className="xp-app-image">
                <Carousel dots={false}>
                    {app['im:image'].map(item=>{
                        return(
                            <img key={item.label} alt="" src={item.label}></img>
                        )
                    })}
                </Carousel>
                <div className="xp-app-image-tip">iPhone、iPad和Message信息App</div>
            </div>
            <div className="xp-app-detail" style={detailInfoStyle}>
                <div className="xp-app-more-detail" onClick={()=>setMoreDetailInfo(true)} style={{display:moreDetailInfo?"none":"block"}}>查看更多</div>
                {detailInfo.slice(0,detailInfo.length-1).map(item=>{
                    return(
                        <p key={item}>{item}。</p>
                    )
                })}
            </div>
            <div className="xp-app-other-info">
                <h2>信息</h2>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">供应商</span>
                    <span className="xp-app-other-info-list-content">{app.rights.label}</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">大小</span>
                    <span className="xp-app-other-info-list-content">451.3MB</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">类别</span>
                    <span className="xp-app-other-info-list-content">{app['im:contentType'].attributes.label}</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">兼容性</span>
                    <span className="xp-app-other-info-list-content">可在此iPhone上使用</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">语言</span>
                    <span className="xp-app-other-info-list-content">中文和另外5种</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">年龄分级</span>
                    <span className="xp-app-other-info-list-content">9+</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">App内购买</span>
                    <span className="xp-app-other-info-list-content">是</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">上架日期</span>
                    <span className="xp-app-other-info-list-content">{app['im:releaseDate'].attributes.label}</span>
                </li>
                <li className="xp-app-other-info-list">
                    <span className="xp-app-other-info-list-label">版权</span>
                    <span className="xp-app-other-info-list-content">{app.rights.label}</span>
                </li>
            </div>
        </div>):""
    )
}
export default AppPage