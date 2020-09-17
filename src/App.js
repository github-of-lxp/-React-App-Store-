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
