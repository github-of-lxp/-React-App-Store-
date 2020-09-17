import "./Search.css"
import React, { useRef, useState,memo } from 'react'

export default memo(props=>{
    const keyword=useRef()
    const cancleBtn=useRef()
    const [cancle,setCancle]=useState(false)
    const handleOnBlur=()=>{
        keyword.current.blur()
        setCancle(false)
        cancleBtn.current.style.right=-40/37.5+"rem"
        keyword.current.style.width=346/37.5+"rem"
       
    }
    const handleOnFocus=()=>{
        keyword.current.focus()
        setCancle(true)
        cancleBtn.current.style.right=20/37.5+"rem"
        keyword.current.style.width=286/37.5+"rem"
    }
    const style={
        opacity:cancle?1:0
    }
    return(
        
        <div className='search-container'>
            <div className='search-bar'>
                <div className='iconfont icon-search'><img alt="" src={require('../../icon/search.png')}></img></div>
                <input className='search-input' type="text" ref={keyword} placeholder="搜索应用" onFocus={handleOnFocus} onInput={e=>props.handleOnInput(e.target.value)} onBlur={handleOnBlur}/>
                {/* { */}
                    {/* this.state.showCancelBtn && */}
                <div className='search-cancel' ref={cancleBtn} onClick={handleOnBlur} style={style}>取消</div>
                {/* } */}
            </div>
        </div>
    )
},()=>true)