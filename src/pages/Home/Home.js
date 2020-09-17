import React,{ useState }  from 'react'
import Search from "../../components/Search/Search"
import Recomend from '../../components/Recomend/Recomend'
import Games from '../../components/Games/Games'
import Loading from '../../components/Loading/Loading'
import { connect } from 'react-redux'

const mapState=state=>({
    loading:state.loading.loading
})
function Home(props){
    const [searchVal,setSearchVal]=useState("")
    return(
        <div className="home">
            <Loading text={"加载中……"} showLoading={props.loading}></Loading>
            <Search handleOnInput={(newVal)=>setSearchVal(newVal)}></Search>
            <Recomend></Recomend>
            <Games searchVal={searchVal}></Games>
        </div>
    )
}

export default connect(mapState)(Home)