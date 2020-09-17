import React, { memo, useEffect } from 'react'
import "./Loading.css"
function Loading(props){
    useEffect(()=>{
        document.body.style.overflow=props.show?"hidden":"auto"
    },[props.show])
    return(
        <div className="loading-wrapper">
            <div className="loading-icon">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="loading-text">{props.text?props.text:"加载中……"}</div>
        </div>
    )
}

function Wrapper(Component){
    
    return function(props){
        
        const loadingStyle={
            display:props.showLoading?"block":"none"
        }
        return(
            <div className="bg-wrapper" style={loadingStyle}>
                <Component text={props.text} show={props.showLoading}></Component>
            </div>
        )
    }
}

export default memo(Wrapper(Loading),(prev,next)=>prev.showLoading===next.showLoading)