# React-App-Store
技术栈react+react-router+redux+axios，个人练手小项目

第一步
-------
移动端首先要进行rem适配，教程可参考这个链接https://dotnet9.com/14042.html

第二步
-------
配置api,在src目录下新建api文件夹，在api中新建index.js文件如下，并export导出
```javascript
  import axios from 'axios'
  const baseUrl="http://localhost:3000/mock/"

  export const getRecomendData=()=>{
      return axios.get(baseUrl+"recomendData.json")
  }

  export const getAppList=()=>{
      return axios.get(baseUrl+"appListData.json",{})
  }
```
数据采用本地模拟数据，mock文件夹一定要放在public文件夹里边

第三步
-------
构建page，项目分为两个界面，Home和AppPage，因此使用react-router切换两个页面
新建pages文件夹，然后新建Home和AppPage两个页面，然后将两个页面导入到App.js中，并在项目的index.js中配置


第四步
-------
配置redux，redux有三个作用，第一是搜索框改变时更新state，第二是点击‘加载更多’更新state，第三个是对Loading提示框的state的改变
其中，第二个部分采用的异步action加载更多数据和控制loading

redux完整代码如下

store.js
-------
```javascript
import {createStore,applyMiddleware} from 'redux'
import gameApp from './reducer'
import thunk from 'redux-thunk'

const store=createStore(gameApp,applyMiddleware(thunk))

export default store
```

action.js
-------
```javascript
import { ADD_GAME_LIST,CHANGE_GAME_LIST,SHOW_LOADING,HIDE_LOADING} from './action-type'
import {getAppList } from '../api/index'

//异步action，即在action中dispatch别的action
export function addGameList(pageIndex,pageNum,searchVal){
    return dispatch=>{
        getAppList().then(res=>{
            let list=null
            list=[...res.data.feed.entry.filter(item=>item['im:name'].label.indexOf(searchVal)!==-1).slice(pageNum*(pageIndex-1),pageNum*pageIndex)]
            setTimeout(()=>{
                dispatch(hideLoading())
                //隐藏loading
                dispatch({
                    type:ADD_GAME_LIST,
                    addlist:list?list:[]
                })
            },1000)
            //此处加入settimeout，模拟真实请求过程
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
```



reducer.js
-------
```javascript
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
```

最后app.js和index.js如下

app.js
-------
```javascript
import React from 'react';
import './App.css';
import Home from './pages/Home/Home'
import { Switch,Route, useHistory } from 'react-router-dom'
import AppPage from "./pages/AppPage/AppPage"
import {KeepAlive} from 'react-keep-alive';
function App() {
  const route=useHistory()
  if(route.location.pathname==="/"){
    route.push("/home")
  }
  return (
    <div className="app">
      <Switch>
       
          <Route path="/home" exact>
            <KeepAlive name="app">
               <Home />
            </KeepAlive>
          </Route>
        
          <Route path="/home/app/:id"><AppPage/></Route>
        
      </Switch>
    </div>
  );
}

export default App
```
index.js
-------
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'lib-flexible';
import store from '../src/store/store'
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'
import {
  Provider as KeepAliverProvider
} from 'react-keep-alive';
ReactDOM.render(
    <Router>
      <Provider store={store}>
        <KeepAliverProvider>
          <App />
        </KeepAliverProvider>
      </Provider>
    </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
```
最后附上效果图

