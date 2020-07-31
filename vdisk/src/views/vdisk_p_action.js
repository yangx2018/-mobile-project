import React,{useState,useEffect} from 'react';
import {Modal,Flex,Toast} from 'antd-mobile';
import api from '../utils/api'
import MyFunLogo from '../assets/images/MyFunLogo';


const alert = Modal.alert;
const prompt = Modal.prompt
const deleterequest=(data)=>{
    return api.get("/file/delete",{
        params:{
            ...data
        }
    }).then(res=>res.data);
}
const renamerequest=(data)=>{
    return api.post("/file/saveOrUpdate",{
        ...data
    }).then(res=>res.data);
}


const ActionModal=(props)=>{
    
    const [actiontypearr,setactiontypearr] = useState([{"type":"重命名","img":"rename","action":"rename"},
                                                    {"type":"删除","img":"deleteimg","action":"delete"}])

    // useEffect(() => {
    //     if(props.actionData.type===1){
    //         setactiontypearr([{"type":"重命名","img":"rename","action":"rename"},
    //                     {"type":"删除","img":"deleteimg","action":"delete"},
    //                     {"type":"下载","img":"downloadimg","action":"download"}])
    //     }else{
    //         setactiontypearr([{"type":"重命名","img":"rename","action":"rename"},
    //                  {"type":"删除","img":"deleteimg","action":"delete"}])
    //     }
    // },[props.actionData.type])
    
    function actions(type){
        props.onClose()
        switch(type){
            case "delete":
                alert(`删除"${props.actionData.name}"`, '', [
                    { text: '取消', onPress: () => console.log('取消') },
                    { text: '删除', onPress: () => {
                        Toast.loading('Loading...', 1)
                        deleterequest({extId:props.actionData.extid,id:props.actionData.id}).then(res => {
                            // console.log(res)
                            if(res.message==="success"){
                                props.resetlist()
                            }else{
                                Toast.fail(res.message, 1);
                            }
                        })
                    } },
                ])
                break;
            case "rename":
                prompt('重命名', '请输入文件夹名称', [
                    { text: '取消' },
                    { text: '确定', onPress: value => {
                        renamerequest({extId:props.actionData.extid,id:props.actionData.id,name:value}).then(res =>{
                            // console.log(res)
                            if(res.message==="success"){
                                props.resetlist()
                            }else{
                                Toast.fail(res.message, 1);
                            }
                        })
                    } },
                  ], 'default', `${props.actionData.name}`)
                break;
            // case "download":
            //     console.log("windowm.yyzd",window.yyzd);
            //     (async function gettoken(){
            //         const localToken = await getLocal('token');
            //         const token = localToken ? JSON.parse(localToken) : {};
            //         const url = window.CONFIG.API_BASE_URL + "/file/download?access_token="+token.access_token+"&ids="+props.actionData.id+"&extId="+props.actionData.extid
            //         console.log("url",url);
            //         window.yyzd.downloadnative(url);
            //     })()
            //     break;
            default:
                return false
        }
    }

    return<Modal visible={props.visible} popup
             animationType="slide-up"  onClose={()=>props.onClose()}
            >
           <div className="actionmodal">
                <div className="pa-15">文件名</div>
                <Flex className="plr-15" justify="wrap">
                    {actiontypearr.map((item, index) => {
                        return (
                            <div className="actiontype" key={index}>
                                <div className="actiontype_img" onClick={() => actions(item.action)}>
                                    <img src={MyFunLogo.getIcon(item.img)} alt='' />
                                </div>
                                <span>{item.type}</span>
                            </div>
                        );
                    })}
                </Flex>
                <div className="closebutton" onClick={() => props.onClose()}>取消</div>
            </div>
          
    </Modal>
}
export default ActionModal;



