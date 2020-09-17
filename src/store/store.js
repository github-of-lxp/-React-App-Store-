import {createStore,applyMiddleware} from 'redux'
import gameApp from './reducer'
import thunk from 'redux-thunk'
const store=createStore(gameApp,applyMiddleware(thunk))

export default store
