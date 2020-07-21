import axios from 'axios';
import {Toast} from 'antd-mobile';
import getLocal from './tool'
const api=axios.create({
    baseURL:window.CONFIG.API_BASE_URL
});
// api.interceptors.request.use(config=>{
//     //请求
//     console.log("api response intereptors config",config)
//     getLocal('token').then(res => {
//         console.log(res)
//         const token =res? JSON.parse(res) : {};
//         if (token) {
//                 config.headers["Authorization"]="Bearer" + token.access_token;
//                 const myconfig1={...config,params:{...config.params}};
//                 console.log("myconfig1111",myconfig1)
//                 return myconfig1
//           }
//     }).then(res => console.log("bbb",res));
    
//     // const token=localStorage.getItem("token");
//     // if(token){
//     // config.headers["Authorization"]=token; 
//     // }
//     // const myconfig={...config,params:{...config.params,CSSC_deviceType:"cssc_mobile"}};//给后台标记设备类型
//     // config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiTDQ4NTA1QGNzc2NocHMiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXSwiZXhwIjoxNTkzNzQzMzQ1LCJhdXRob3JpdGllcyI6W10sImp0aSI6Ijc2M2I2YzJiLWNmYzctNDgyYi05OTA2LThjYzdhZjRkMjI3NCIsImNsaWVudF9pZCI6IiQyYSQxMCRYT1ZzNFoxWXRQS3FLd1FWeXdHOWoueExBcVhZUlFMR1pNR01yWkROYnRsNnBVQzBXZXRlcSJ9.C_kQSECqsNbYaFcQRbhKjYeR_0t4Vnth_oHx8XE64oeR62qq8FqzwpbdomXRCHj2-Hg2IJsNAkN2WvNVI18pjyYHU1ZpsZ2FZnG-eIIQ5J1_z_zC9_JjuUzgMNjLXEODkZSsME_jkAmtPbHu0ROaxA2i0d1Z9MFBkziaMkBlT57VH_yvN1E69WGG0DTQ482OPdbPOwWCCiHvGTmB0IGtKyvfJuPW0ChG3rp7AfQVvlJ2VBvmSI772-zVPG-h7NAHHNnkZqyVvlxyx4JxH5YavzEXM4QXRbUZm7Nsdzn3VqVc6Gz1CANlel--ZLYjn0G-DlGGlCSdHuCLgJljTytRZw"
//     const myconfig={...config,params:{...config.params}};
//     return myconfig;
// },error=>{
//     return Promise.reject(error);
// });
api.interceptors.request.use(async function tt(config){
    console.log("api response intereptors config",config)
    const localToken = await getLocal('token');
    const token = localToken ? JSON.parse(localToken) : {};
    if(token){
        config.headers["Authorization"]="bearer" + token.access_token; 
    }
    console.log("lalalala",localToken)
    // config.headers["Authorization"]="bearereyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcHRlbSIsIm9yZGVyLXNlcnZpY2UiXSwidXNlcl9uYW1lIjoiWjYxNzlAY3NzY2hwcyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJleHAiOjE1OTUyMjY5NzgsImF1dGhvcml0aWVzIjpbXSwianRpIjoiZGQ3ZDgyZTQtY2RmNS00MjM4LTllZDgtOWI1YzhmNWFlODA0IiwiY2xpZW50X2lkIjoiJDJhJDEwJFhPVnM0WjFZdFBLcUt3UVZ5d0c5ai54TEFxWFlSUUxHWk1HTXJaRE5idGw2cFVDMFdldGVxIn0.UI7Ns1kuEB-NN4KdWymORXWjLXYlkMj0hyeeqyY_ofJx32GECQMBkVf5__AtsX-dL8Gt7Gk3-NPz3Etk1bnTVNA1j7gq20RVGyEdv9ygeawXdt7oH-jfX0zTiX4HKBwqrqjStYhkXsMIcuY8VAkFmx8yUnd5URs3j52mCHHy66U1KJNMCj2hepkx6mF9xDMEn2IFYKzFag3Ppuk6EWaAkIBZLDj3ab-sYGY6L5lpmNTYpbICQ1JRF37RhBMVrj7Pnb_qf_hZ7z4TT-GZVIieHiFjd9bZOJG3TwYQDDWK_D0J5mlZBCnoBaA5X1fdwVZ_A26IHzn-qcHNYoGMzkrNfA"
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