import React,{useState,useEffect} from 'react';
import {NavBar, Icon,SearchBar,List,Toast} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.css';
import api from '../utils/api'
import MyFunLogo from '../assets/images/MyFunLogo';
import SearchFilepack from './vdisk_searchfile'
import BuildModal from './vdisk_p_build'

//初始目录
const getFolder=()=>{
    return api.get("/file/folder").then(res=>res.data);
}
//查询文件列表
const getFilelist=(data)=>{
    return api.get("/file/list",{
        params:{
            ...data
        }
    }).then(res=>res.data);
}
const Vdisk_list = ({history,...rest}) => {

    
    const [originData,setoriginData]=useState([])
    const [listData,setlistData]=useState([])
    const [isIndex,setisIndex]=useState(undefined) //判断是不是首页
    const [prevId,setprevId]=useState([])  //存放上一页id的数组
    const [currentExtid,setcurrentExtid]=useState(undefined)  //存放当前进入的extId
    const [buildfilelogo,setbuildfilelogo]=useState(false) //控制 新建logo 模态框 可见
    
    useEffect(() => {
        getFolder().then(res => {
            console.log("初始化",res)
            const originarr = res.data.folders.filter(item => {
                if(item.pid===null){
                    return item
                }
            })
            setoriginData(originarr)
        })
    },[]);

    function handelonSubmit(e){
        e&&currentExtid&&getFilelist({name:e,pid:prevId[prevId.length-1],extId:currentExtid}).then(res=>{
            if(res.message==="success"){
                setlistData(res.data.list)
            }else{
                Toast.fail(res.message, 1);
            }
        })
    }

    //点击获取
    function gotoNext(data) {
        if(data.extId===2){
            getFilelist({extId:data.extId,pid:data.id}).then(res => {
                console.log(res)
                if(res.message==="success"){
                    setlistData(res.data.list)
                    setisIndex(1)   //不是首页
                    setprevId([...prevId,data.id])     //将查询数据id放入上一页id
                }
            })
        }else if(data.extId===1){
            getFilelist({extId:data.extId,pid:data.id}).then(res => {
                console.log(res)
                if(res.message==="success"){
                    setlistData(res.data.list)
                    setisIndex(1)
                    setprevId([...prevId,data.id])
                }
            })
        }else{
            return false
        }
    }
    // console.log(prevId)
    //返回上一页
    function prevpage(){
        if(prevId.length>1){
            let prevId_length = prevId.length
            getFilelist({extId:currentExtid,pid:prevId[prevId_length-2]}).then(res =>{
                if(res.message==="success"){
                    prevId.pop()
                    setlistData(res.data.list)
                    setisIndex(1)   //不是首页
                }
            })
        }else if(prevId.length===1){
            //若只有两层，返回上一页也是首页
            prevId.pop()
            setlistData([])
            setprevId([])
            setisIndex(undefined)
        }
    }  

    //操作函数结束后重置列表
    function resetlist(){
        console.log("重置了")
        let prevId_length = prevId.length
        getFilelist({extId:currentExtid,pid:prevId[prevId_length-1]}).then(res =>{
            if(res.message==="success"){
                console.log(res)
                setlistData(res.data.list)
            }
        })
    }

    return (
    <div className="App">
        <NavBar
            mode="dark"
            icon={isIndex?<Icon type="left" />:<div></div>}
            onLeftClick={prevpage}
            rightContent={isIndex?[
            <img key="1" src={MyFunLogo.getIcon("buildfilelogo")} alt="" width="22px" onClick={() => setbuildfilelogo(true) } />
            ]:<div></div>}
        >
            {/* 微盘 */}
        </NavBar>
        {isIndex?
            <SearchBar placeholder="搜索文件" onSubmit={handelonSubmit} />:<div></div>}
        
        <div className="index_style">
            {isIndex?
                <SearchFilepack data={listData} searchlist={gotoNext} resetlist={() => resetlist()} />:
                <div>
                    {originData.map((item, index) => {
                    return (
                        <List renderHeader={() => item.title} key={index}>
                            <List.Item thumb={MyFunLogo.getIcon("filepack")}  
                            key={index} align="middle" wrap={false} onClick={() => {setcurrentExtid(item.extId);gotoNext(item);}} >
                            {item.name}
                            </List.Item>
                        </List>
                    );
                    })}
                </div>
                
            }
        </div>
        <BuildModal visible={buildfilelogo} onClose={() => setbuildfilelogo(false)} 
        thepid={prevId} theextId={currentExtid} resetlist={resetlist} />
    </div>
  );
};
export default Vdisk_list;