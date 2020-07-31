import axios from 'axios';
import {Toast} from 'antd-mobile';
import getLocal from './tool'
const api=axios.create({
    baseURL:window.CONFIG.API_BASE_URL
});
api.interceptors.request.use(async function tt(config){
    console.log("api response intereptors config",config)
    const localToken = await getLocal('token');
    console.log("lalalala",localToken)
    const token = localToken ? JSON.parse(localToken) : {};
    if(token){
        config.headers["Authorization"]="bearer" + token.access_token; 
    }
    //  config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiWjYxNzlAY3NzY2hwcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1OTU0OTUyOTAsImF1dGhvcml0aWVzIjpbXSwianRpIjoiN2E0NmZhNDYtNTAwNC00ZmE1LWFhOGMtNmRhYjNhYTA5MTM2IiwiY2xpZW50X2lkIjoiJDJhJDEwJFhPVnM0WjFZdFBLcUt3UVZ5d0c5ai54TEFxWFlSUUxHWk1HTXJaRE5idGw2cFVDMFdldGVxIn0.DTe_o114wKm6lirk90841VoxlBmU8zqJInqawprF_8Ej3Lug_NIOad8a3zScPacSjgvVNLdvOb61VxG5aVrQRSohl0fE5Ve9XDICiIU8lrDR7ld3EDb_-cY8H4mXH7EbTTBXyJAKc3JUkWZ6IE84FINdgEEK6adX2Doe5aG86jsygEsXyMsa-1tMMDwcvyt18PI4RQ0agnvZ8EhyA6NiA07l2M379bzT57jjpepiEE621L4n0uacGZEZML43mas2m5FOGzQE9jyN7z2Jl5C2AJyHbExDPg8NTermm1jC9bOu_99zuxFtGvZEvsYNkLYUiVtxpGN2DGkKEdOGSNvO4w"
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