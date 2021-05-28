import axios from 'axios';
import {Toast} from 'antd-mobile';
// import getLocal from './tool'
const api=axios.create({
    baseURL:window.CONFIG.API_BASE_URL
});
api.interceptors.request.use(async function tt(config){
    console.log("api response intereptors config",config)
//     const localToken = await getLocal('token');
//     const token = localToken ? JSON.parse(localToken) : {};
//     if(token){
//         config.headers["Authorization"]="bearer" + token.access_token; 
//     }
    // config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiZGRtYWRtaW5AZGRtYSIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE2MjIyMDk5MjMsImF1dGhvcml0aWVzIjpbXSwianRpIjoiZjFiZjJlMzEtNmNjMi00Mjc1LWJiZGYtOWZiY2U2ZTZkNjkxIiwiY2xpZW50X2lkIjoiJDJhJDEwJFhPVnM0WjFZdFBLcUt3UVZ5d0c5ai54TEFxWFlSUUxHWk1HTXJaRE5idGw2cFVDMFdldGVxIn0.TmwhePxfTHbMa8DcCExK_vdDitM2TdWLtA0SZlpfbliZgwkiv4n5pyr2yFGq4OX2z5hqKf6wZ1qhrp9O3kQm7iu0TaiNJZhV1UAtggYCi6N8DUIafVQ-lxBY7rMsDVYR-WrZJeBXhIiMFcXttv50OVeAYgywdCit-BhKpfaE29pNlMBWUIW3AsO7gXyLLtva4eCo8BSmOfMEZWGWKl6qt296RNdkahn-inmOBIaRMGGnG2GoUIMf96FjdaoC_sf1ui386k6M9QteBPBn7ukuig1k2wMZuKR2hF0zbQzVvh_r2tSPSWagwWNmNCcOQjxq160FN07fR25At1EnvRfR0g"
    if(localStorage.getItem("token_")){
        config.headers["Authorization"]="bearer" + localStorage.getItem("token_"); 
    }
    const myconfig={...config,params:{...config.params}};
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