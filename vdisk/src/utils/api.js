import axios from 'axios';
import {Toast} from 'antd-mobile';
import getLocal from './tool'
const api=axios.create({
    baseURL:window.CONFIG.API_BASE_URL
});
api.interceptors.request.use(async function tt(config){
    console.log("api response intereptors config",config)
    const localToken = await getLocal('token');
    const token = localToken ? JSON.parse(localToken) : {};
    if(token){
        config.headers["Authorization"]="bearer" + token.access_token; 
    }
    console.log("lalalala",localToken)
    // config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiWjYxNzlAY3NzY2hwcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1OTYwMDQ4MDAsImF1dGhvcml0aWVzIjpbXSwianRpIjoiOTY5MDdjYzEtZTgxOC00Y2RmLThjZTQtNTQ3NjBiYmQxYzlhIiwiY2xpZW50X2lkIjoiJDJhJDEwJFhPVnM0WjFZdFBLcUt3UVZ5d0c5ai54TEFxWFlSUUxHWk1HTXJaRE5idGw2cFVDMFdldGVxIn0.LyKfUWrvf1v1KYTAQvIokH6jBM22mTtF_Mf5hJz4o_s5ZJo9xDQKZLUATCnOhNeiRg2lDyZtSMNszhJGGc5Ndy4n0-9ChHMaYHEp_h6-OUbwzERtLrxuYoLfd89I9-h1VftRGeuutjLzee0dxgMg0Mv2MIWtlrTHFwYlWaNjp2EFERK3E_Wxx-HQcilwCFTe6wLnqXkpRZxzSFy7TbMJw4WcKoqtUYaBkwOBWg4CxL8q9jEBlnIiTjdigOvobAhf9W1eHoDBeOLaTASeRR1xlxB9rKhLE1RmNXdQdOOSD-6mviv9rVeuOG8xBpgcYbYvZdEhKzzKMjnrkZpBgUyqbA"
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