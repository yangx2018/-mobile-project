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
    if(localStorage.getItem("token_")){
        config.headers["Authorization"]="bearer" + localStorage.getItem("token_"); 
    }
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
         return Promise.reject(false);
     }
},error=>{
    Toast.fail("网络请求失败")
   return Promise.reject(error);
      
})
export default api;