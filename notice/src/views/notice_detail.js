import React,{useState,useEffect} from 'react';
import {List , Icon} from "antd-mobile";
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
  
    const [dataDetail,setdataDetail]=useState(undefined);
    const [loadding,setLoadding]=useState(true);
    const [searchParams,setSearchParams]=useState({id:props.match.params.ID});

    useEffect(()=>{
        console.log(props)
        getNoticedetail({...searchParams}).then(res=>{
            console.log(res)
            if(res.message==="success"){
                setdataDetail(res.data)
                setLoadding(false)
                document.getElementById('myContent').innerHTML=res.data.noticeExplain;
                
            }
        })
    },[]);

    async function loadextrafile(item){
        const localToken = await getLocal('token');
        const token = localToken ? JSON.parse(localToken) : {};
        const loadurl = window.CONFIG.API_BASE_URL + "/notice/batchdownload?access_token="+token.access_token+"&ids="+item.id
        console.log("url",loadurl);
        window.yyzd.downloadnative(loadurl);
    }

    return (
    <div>
        {/* <NavBar
            mode="dark"
            icon={<Icon type="left" />}
            onLeftClick={() =>{props.history.goBack();} }
            // rightContent={[
            // <Icon  key="1" type="ellipsis"/>
            // ]}
        >
            公告
        </NavBar> */}
        {dataDetail?<div className="notice_detail">
            <h2>{dataDetail.noticeTitle}</h2>
            <p style={{color:"#888"}}>{Changetime(dataDetail.applicantDate,1)}</p>
            <p>{dataDetail.applicantMajorName}-{dataDetail.applicantName}</p>
            <div id='myContent' style={{"wordWrap" : "break-word"}}></div>
            <div className="mt-10">
                {dataDetail.attachmentList.length>0?
                <List renderHeader={() => '附件'}>
                    {dataDetail.attachmentList.map((item, index) => {
                        return (
                            <List.Item key={index} extra={'点击下载'} onClick={() => loadextrafile(item)}>{item.fileName}</List.Item>
                        )
                    })}
                </List>:<div></div>
                }
            </div>
        </div>:<div className="nodata">{loadding?<Icon type="loading"/>:"没有数据"}</div>
        }
        
    </div>
  );
};
export default NoticePage_detail;
