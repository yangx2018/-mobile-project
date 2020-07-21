import React,{useState,useEffect} from 'react';
import {Icon,List,Result} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.css';
import MyFunLogo from '../assets/images/MyFunLogo';
import ActionModal from './vdisk_p_action'
import moment from 'moment'

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
const SearchFilepack = (props) => {
    
    const [filepack,setfilepack] = useState([])  //文件夹数组
    const [file,setfile] = useState([])          //文件数组
    const [empty,setempty] = useState(undefined) //判断是否有内容
    const [visible,setvisible] = useState(false)  //模态框是否可见
    const [actionData,setactionData] = useState({}) //传递数据给操作页面
    
    useEffect(() => {
        console.log(props.data)
        if(props.data.length>0){
            setempty(false)
            setfilepack(props.data.filter(item => {
                return item.type === 0
            }))
            setfile(props.data.filter(item => {
                return item.type === 1
            }))
        }else{
            setempty(true)
        }
        
    },[props.data]);

    // console.log(actionData,filepack,file)
    return (
        <div>
            {
            empty?<Result img={myImg(MyFunLogo.getIcon("emptyfile"))}  title="此文件夹为空" />:
                <div>
                    {filepack.length>0?
                        <List renderHeader={() => '文件夹'}>
                            {filepack.map((item, index) => {
                            return (
                                <List.Item thumb={MyFunLogo.getIcon("filepack")}  
                                key={index} align="middle" wrap={false} onClick={() => props.searchlist(item)}
                                extra={<Icon type="ellipsis" onClick={(e)=>{
                                    e.stopPropagation();
                                    setvisible(true);
                                    setactionData({...actionData,id:item.id,extid:item.extId,name:item.name,type:item.type});
                                }}></Icon>}> 
                                {item.name}
                                </List.Item>
                            );
                            })}
                        </List>:<div></div>
                    }
                    {file.length>0?
                        <List renderHeader={() => '文件'}>
                            {file.map((item, index) => {
                            return (
                            <List.Item thumb={MyFunLogo.getfileimg(item.fileType)}  key={index} align="middle" wrap={false}
                            extra={<Icon type="ellipsis" onClick={()=>{setvisible(true);
                                setactionData({...actionData,id:item.id,extid:item.extId,name:item.name,type:item.type})}}></Icon>}>
                                {item.name}<List.Item.Brief>{item.createUser} · {moment(item.createDate).format('YYYY-MM-DD')}</List.Item.Brief>
                            </List.Item>
                            );
                            })}
                        </List>:<div></div>
                    }
                    <ActionModal visible={visible} onClose={() =>setvisible(false) } actionData={actionData} resetlist={props.resetlist} />
                </div>
            }
        </div>
        
  );
};
export default SearchFilepack;
