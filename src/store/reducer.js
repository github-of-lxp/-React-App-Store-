import { combineReducers } from 'redux'
import { ADD_GAME_LIST,CHANGE_GAME_LIST,SHOW_LOADING,HIDE_LOADING} from './action-type'

function game(state={searchList:[]},action){
    switch(action.type){
        case ADD_GAME_LIST:
            return {
                searchList:[...state.searchList,...action.addlist]
            }
        case CHANGE_GAME_LIST:
            return {
                searchList:[...action.newlist]
            }
        default:
            return state
    }
}
function loading(state={loading:false},action){
    switch(action.type){
        case SHOW_LOADING:
            return {
                loading:true
            }
        case HIDE_LOADING:
            return {
                loading:false
            }
        default:
            return state
    }
}
const gameApp=combineReducers({
    game,
    loading
})
export default gameApp