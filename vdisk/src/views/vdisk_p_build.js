import React,{useState} from 'react';
import {Modal,Flex,Toast} from 'antd-mobile';
import api from '../utils/api'
import MyFunLogo from '../assets/images/MyFunLogo';


const prompt = Modal.prompt
const uploadimgrequest=(data)=>{
    return api.post("/file/upload",{
        ...data
    }).then(res=>res.data);
}
const buildfilepackrequest=(data)=>{
    return api.post("/file/saveOrUpdate",{
        ...data
    }).then(res=>res.data);
}

const BuildModal=(props)=>{
    
    const [buildtype,setbuildtype] = useState([
        {"type":"新建文件夹","img":"buildfilepack","action":"filepack"},
    ])
    function actions(type){
        props.onClose()
        switch(type){
            // case "uploadimg":
                
            //     break;
            case "filepack":
                
                prompt('新建文件夹', '请输入文件夹名称', [
                    { text: '取消' },
                    { text: '确定', onPress: value => {
                        buildfilepackrequest({extId:props.theextId,pid:props.thepid[props.thepid.length-1],name:value,type:0}).then(res =>{
                            // console.log(res)
                            if(res.message==="success"){
                                Toast.success("创建成功", 1)
                                props.resetlist()
                            }else{
                                Toast.fail(res.message, 1);
                            }
                        })
                    } },
                  ], 'default',null)
                break;
            default:
                return false
        }
    }
    //上传图片和文件
    //转化为base64
    // function createObjectURL(blob){
    //     if (window.URL){
    //         return window.URL.createObjectURL(blob);
    //     } else if (window.webkitURL){
    //         return window.webkitURL.createObjectURL(blob);
    //     } else {
    //         return null;
    //     }
    // }
    // function isimg(fileName){
    //     let jpg = (fileName.indexOf(".jpg") > -1) || (fileName.toLowerCase().indexOf(".jpg") > -1);
    //     let png = (fileName.indexOf(".png") > -1) || (fileName.toLowerCase().indexOf(".png") > -1);
    //     let jpeg = (fileName.indexOf(".jpeg") > -1) || (fileName.toLowerCase().indexOf(".jpeg") > -1);
    //     let gif = (fileName.indexOf(".gif") > -1) || (fileName.toLowerCase().indexOf(".gif") > -1);
    //     let bmp = (fileName.indexOf(".bmp") > -1) || (fileName.toLowerCase().indexOf(".bmp") > -1);
    //     if(jpg || png || jpeg || gif || bmp){
    //         return true
    //     }else{
    //        Toast.fail("请选择合适的图片类型文件！",1);
    //        return false
    //     }
    // }
    function uploadfile(e){
        props.onClose()
        let file = e.target.files[0]
        const fr = new FileReader(file)
        fr.readAsDataURL(file)
        fr.onload = function () {
            uploadimgrequest({
                pid:props.thepid[props.thepid.length-1],
                fileName:file.name,
                extId:props.theextId,
                fileBase64:this.result})
                .then(res =>{
                    if(res.message==="success"){
                        Toast.success("上传成功", 1)
                        props.resetlist()
                    }else{
                        Toast.fail(res.message, 1);
                    }
                })
        }
    }
    //上传图片结束
    return<Modal visible={props.visible} popup
             animationType="slide-up"  onClose={()=>props.onClose()}
            >
           <div className="actionmodal">
                <Flex className="plr-30" justify="wrap">
                    {buildtype.map((item, index) => {
                        return (
                            <div className="buildtype" key={index}>
                                <div className="buildtype_img" onClick={() => actions(item.action)}>
                                    <img src={MyFunLogo.getIcon(item.img)} alt='' />
                                </div>
                                <span>{item.type}</span>
                            </div>
                        );
                    })}
                    <div className="buildtype" key={555}>
                        <div className="buildtype_img">
                            <img src={MyFunLogo.getIcon("filepack")} alt='' />
                            {/* multiple */}
                            <input className="fileinput" type="file"   onChange={(e) => uploadfile(e)}/>
                        </div>
                        <span>上传</span>
                    </div>
                </Flex>
                <div className="closebutton" onClick={() => props.onClose()}>取消</div>
            </div>
          
    </Modal>
}
export default BuildModal;



