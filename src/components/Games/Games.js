import React, { useEffect, useState } from 'react'
import './Games.css'
import {getAppList } from '../../api/index'
import { addGameList,changeGameList,showLoading} from '../../store/action'
import {connect} from 'react-redux'
import { useHistory } from "react-router-dom"
const mapStateToProps=state=>({
    searchList:state.game.searchList
})
const mapDispatchToProps=dispatch=>({
    addGameList:(pageIndex,pageNum,searchVal)=>dispatch(addGameList(pageIndex,pageNum,searchVal)),
    changeGameList:(newlist)=>dispatch(changeGameList(newlist)),
    showLoading:()=>dispatch(showLoading())
})
function Games(props){
    const route=useHistory()
    async function requestData(searchVal){
        let data=null
        await getAppList().then(res=>{
            data=searchVal?res.data.feed.entry.filter(item=>item['im:name'].label.indexOf(searchVal)>-1).slice(0,10):
            res.data.feed.entry.slice(0,10)
            props.changeGameList(data)
        }).catch(err=>{
            console.log(err)
        })
        
    }
    let [pageIndex,setPageIndex]=useState(1)
    
    useEffect(()=>{
        requestData(props.searchVal?props.searchVal:"")
        setPageIndex(1)
    },[props.searchVal])
    const handleClickItem=e=>{
        let index=e.currentTarget.dataset.index
        e.stopPropagation()
        e.preventDefault()
        // route.push({pathname:"/home/app",state:props.searchList[index]})
        route.push({pathname:"/home/app/"+props.searchList[index].id.attributes['im:id']})
    }
    const handleLoadMore=()=>{
        props.showLoading()
        props.addGameList(pageIndex+1,10,props.searchVal)
        setPageIndex(pageIndex+1)
    }
    return(
        <div className="game-wrapper">
            <ul>
                {props.searchList?props.searchList.map((item,index)=>{
                    return(
                        <li key={item.id.attributes['im:id']} className="game-list" onClick={handleClickItem} data-index={index}>
                            <div className="game-index">{index+1}</div>
                            
                            <div className="game-icon"><img alt="" src={item['im:image'][0].label}></img></div>
                            <div className="game-simply-info">
                                <div>{item['im:name'].label}</div>
                                <div>{item.category.attributes.label}</div>
                            </div>
                        </li>
                    )
                }):""}
            </ul>
            <div className="load-more" onClick={handleLoadMore}>点击加载更多</div>
        </div>
    )
}
export default connect(mapStateToProps,mapDispatchToProps)(Games)
