import React, { useEffect } from 'react';
import { ActivityIndicator,Toast } from 'antd-mobile';
import axios from 'axios';

const LoadingAuth = (props) => {

    useEffect(()=>{
        const paramsArr = getparams();
        console.log("aaa",paramsArr);
        axios.get(window.CONFIG.API_AUTH_URL + "/uaa/api/user/token_to_accessToken", { params: { token: paramsArr.code, type: paramsArr.type || 1 } })
        .then(res => {
            if(res.data.access_token){
                localStorage.setItem("token_",res.data.access_token);
                props.history.push({pathname:`/`,})
            }else{
                Toast.fail("获取token失败")
            }
        })
    },[]);

    //获取地址中的船海智云app token
    const getparams = () => {
        let args = {}; // 定义一个空对象
        let query = window.location.search.slice(1);
        let pairs = query.split("&"); // 根据"&"符号将查询字符串分隔开
        for(let i = 0; i<pairs.length;i++){ // 对于每个判断
            let pos=pairs[i].indexOf('='); //查找“name=value”
            if(pos==-1) continue; // 如果没有找到的话，就跳过
            let name = pairs[i].substring(0,pos); // 提取name
            let value = pairs[i].substring(pos+1); // 提取value
            args[name] = value; // 存储为属性
        }
        return args; // 返回解析后的参数
    }

    return (
        <div>
            <ActivityIndicator
            text="Loading..."
            toast
            size="large"
            color="white"
            />
        </div>
    )
}

export default LoadingAuth;