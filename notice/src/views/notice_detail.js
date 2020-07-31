import React,{useState,useEffect} from 'react';
import {List,Checkbox , Button,Icon, Toast} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.css';
import api from  '../utils/api';
import Changetime from '../utils/time'
import getLocal from '../utils/tool'

const getNoticedetail=(data)=>{
    return api.get("/notice/get_by_notice_id",{
     params:{
         ...data
     }
    }).then(res=>res.data);
}
const NoticePage_detail = (props) => {
  
    const [loadding,setloadding]=useState(true);//加载内容loading
    const [dataDetail,setdataDetail]=useState(undefined); //内容
    const [loadids,setloadids] = useState([])   //打包下载的数组
    const [buttonloading,setbuttonloading] = useState(false)  //打包下载等待loading
   
    useEffect(()=>{
        console.log("props.match.params.ID",props.match.params.ID)
        getNoticedetail({id:props.match.params.ID}).then(res=>{
            console.log(res)
            if(res.message==="success"){
                setdataDetail(res.data)
                setloadding(false)
                document.getElementById('myContent').innerHTML=res.data.noticeExplain;
                
            }
        })
    },[]);

    async function loadextrafile(){
            if(loadids.length>0){
                setbuttonloading(true)
                const idsstr = loadids.join()
                const localToken = await getLocal('token');
                const token = localToken ? JSON.parse(localToken) : {};
                const loadurl = window.CONFIG.API_BASE_URL + "/notice/batchdownload?access_token="+token.access_token+"&ids="+idsstr
                console.log("url",loadurl);
                setbuttonloading(false)
                window.yyzd.downloadnative(loadurl);
            }else{
                Toast.info("请选择需要下载的附件",1)
            }
    
    }
    console.log("loadids",loadids)
    return (
    <div>
        {dataDetail?<div className="notice_detail">
            <h2>{dataDetail.noticeTitle}</h2>
            <p style={{color:"#888"}}>{Changetime(dataDetail.applicantDate,1)}</p>
            <p>{dataDetail.applicantMajorName}-{dataDetail.applicantName}</p>
            <div id='myContent' style={{"wordWrap" : "break-word"}}></div>
            <div className="mt-10">
                {dataDetail.attachmentList.length>0?
                <div>
                    <List renderHeader={() => '附件'}>
                        {dataDetail.attachmentList.map((item, index) => {
                            return (
                                <Checkbox.CheckboxItem key={index}  onChange={
                                    (e) => {
                                        const loadids_ = loadids
                                        if(e.target.checked){
                                            setloadids([...loadids_,item.id])
                                        }else{
                                            const newloadids_ = loadids_.filter(loadids_item => {
                                                if(loadids_item !== item.id){ return loadids_item}
                                            })
                                            setloadids(newloadids_)
                                        }
                                    }
                                }>{item.fileName}</Checkbox.CheckboxItem>
                            )
                        })}
                    </List>
                    <Button type="ghost" size="small" onClick={() => loadextrafile()} loading={buttonloading} style={{width:"30%",marginTop:"10px"}}>打包下载</Button>
                </div>:<div></div>
                }
            </div>
        </div>:<div className="nodata">{loadding?<Icon type="loading"/>:"没有数据"}</div>
        }
        
    </div>
  );
};
export default NoticePage_detail;
