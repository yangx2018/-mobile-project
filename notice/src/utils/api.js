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
    config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiWjYxNzlAY3NzY2hwcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1OTUyNDQwNzQsImF1dGhvcml0aWVzIjpbXSwianRpIjoiYzhmMmIxNzEtOGEzYy00ZjNlLWJmY2YtYzY2MDEyNmVmYmRhIiwiY2xpZW50X2lkIjoiJDJhJDEwJFhPVnM0WjFZdFBLcUt3UVZ5d0c5ai54TEFxWFlSUUxHWk1HTXJaRE5idGw2cFVDMFdldGVxIn0.hb04wrwvMorOrEzOgTW7y1kv6KoLPgL_mSz1IDyNRFGQH3k3sP5OTnjrf3jGWmqaPuzcd3_japlrxmdk9qFwTg0OHs26KlsWhx2Ttw7gzxngPjVvFalq5x2Celmdb0T4N9NycKxqOJu_UYwfeCZ_eDtdrdN3835cYCZXZtfqWpgGC_6-hjwqxXOgi5_mk2bF1XSJbgtkPKxlQdTrebNQgDN8W9eLO00k7ZWJpeCOOnd8JAWub9RKJTq77fj9RpsqFw4Mzqqz5Jsy-L_ia6bUpPouEbFjRxeAjGToKuGU1njHSAHrTWJ1yM11tvHLZnms_iEJJGwyrIK5m_rR5jV2LQ"
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