import axios from 'axios'
const baseUrl="http://localhost:3000/mock/"

export const getRecomendData=()=>{
    return axios.get(baseUrl+"recomendData.json")
}
export const getLookUp=()=>{
    return axios.get(baseUrl+"lookUp.json",{})
}
