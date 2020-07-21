import React,{useState,useEffect,useRef} from 'react';
import {SearchBar, Toast} from 'antd-mobile';

const NoticeSearch= (props) =>{
    // const theinput = useRef()
    // const clllll = () => {
    //     console.log(theinput)
    //     theinput.current.focus()
    // }
    function  handelSearchCom(value){
        value&&props.searchfc({noticeColumnId:props.currentid,queryName:value}).then(res => {
            // console.log("sdfsdfdsfsdfsdf",res)
            // props.onClose()
            res.data.list.length>0?props.resetlist(res.data.list):Toast.success("暂无数据",1)
            
        })
    }
// <Modal
        //     popup
        //     animationType="slide-down"
        //     visible={props.visible}
        //     onClose={()=>props.onClose()}
        //     >
        // </Modal>
    return(
            <div style={{backgroundColor:"#efeff4"}}>
            <SearchBar  placeholder="输入标题搜索"  onSubmit={handelSearchCom} />
            </div>
        )
}
export default NoticeSearch;

