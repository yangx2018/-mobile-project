import axios from 'axios';
import {Toast} from 'antd-mobile';
import getLocal from './tool'
const api=axios.create({
    baseURL:window.CONFIG.API_BASE_URL
});
api.interceptors.request.use(async function tt(config){
    console.log("api response intereptors config",config)
//     const localToken = await getLocal('token');
//     console.log("lalalala",localToken)
//     const token = localToken ? JSON.parse(localToken) : {};
//     if(token){
//         config.headers["Authorization"]="bearer" + token.access_token; 
//     }
    config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiWjYxNzlAY3NzY2hwcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1OTUzMjI0MDcsImF1dGhvcml0aWVzIjpbXSwianRpIjoiMzUzOTkzZTgtYzRlMC00NmM2LWE0Y2UtYTliYzllMzllZDhjIiwiY2xpZW50X2lkIjoiJDJhJDEwJFhPVnM0WjFZdFBLcUt3UVZ5d0c5ai54TEFxWFlSUUxHWk1HTXJaRE5idGw2cFVDMFdldGVxIn0.BIDpk5U-xKOm0T33ilB38XeIQdsxyxzxo_XyA8Cpt7Z_AAklGEVOA3EW-ewipNqEPyL3QJmWBM9jNyL_WoUBdXwnSjuEh1Y5xv89SCRt4zg5tY-7AWalm7WbNr3kXBuH0L3_RlxLMQD-Ho4Aj-glsruircKgmbGTV1re3QB7cwdLH_deWexFf3-_fELk0J_Pi5DCC-OkL4809Z5S880MPh8RcnHyK1xAcWz2LJbNOtY-mrrP5b9lH4888rKutn-ds6A_IO7DYletKPhl6EhgjAtwpoa2VqhI_qYZqLoXunTZrMPosh2YTp7GBaX1Vez84jfOZatHov8U4iLN66Y3UA"
    const myconfig={...config,params:{...config.params}};
    // console.log("aaaaa",myconfig)
    return myconfig;
},error=>{
    return Promise.reject(error);
});
api.interceptors.response.use(response=>{
    console.log("api response intereptors response",response)
     const {status}=response;
     if(status===200){
    //    return Promise.reject(false);
        return response;
     }else{
         //没有登录
         Toast.fail("无法请求到数据")
        //   return response;
        //  window.location.replace('#/login');
         return Promise.reject(false);
     }
},error=>{
    Toast.fail("网络请求失败")
   return Promise.reject(error);
      
})
export default api;