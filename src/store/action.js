import { ADD_GAME_LIST,CHANGE_GAME_LIST,SHOW_LOADING,HIDE_LOADING} from './action-type'
import {getAppList } from '../api/index'

export function addGameList(pageIndex,pageNum,searchVal){
    // loading.changeLoading()

    return dispatch=>{
        getAppList().then(res=>{
            let list=null
            list=[...res.data.feed.entry.filter(item=>item['im:name'].label.indexOf(searchVal)!==-1).slice(pageNum*(pageIndex-1),pageNum*pageIndex)]
            setTimeout(()=>{
                // loading.changeLoading()
                dispatch(hideLoading())
                dispatch({
                    type:ADD_GAME_LIST,
                    addlist:list?list:[]
                })
            },1000)
        })
        .catch(err=>{
            dispatch({
                type:"FAIL",
                msg:err
            })
        })
    }
}

export function changeGameList(newlist){
    return {
        type:CHANGE_GAME_LIST,
        newlist
    }
}

export function showLoading(){
    return {
        type:SHOW_LOADING,
        loading:true
    }
}

export function hideLoading(){
    return {
        type:HIDE_LOADING,
        loading:false
    }
}