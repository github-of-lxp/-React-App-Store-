import axios from 'axios'
const baseUrl="http://localhost:3000/mock/"

export const getRecomendData=()=>{
    return axios.get(baseUrl+"recomendData.json")
}

export const getAppList=()=>{
    return axios.get(baseUrl+"appListData.json",{})
}
