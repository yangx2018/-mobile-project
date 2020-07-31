import React,{useState,useEffect,useRef} from 'react';
import {Icon,List,Tabs,Toast,Result} from "antd-mobile";
import 'antd-mobile/dist/antd-mobile.css';
import api from  '../utils/api';
import Changetime from '../utils/time'
import FilterHtml from '../utils/match'
import Bscroll from '../components/Bscroll';
import NoticeSearch from './notice_search'
const getNoticelist=(data)=>{
    return api.get("/notice/select_notice",{
     params:{
         ...data
     }
    }).then(res=>res.data);
}
const getNoticecolumnlist=(data)=>{
    return api.get("/notice/select_notice_column",{
     params:{
         ...data
     }
    }).then(res=>res.data);
}
const NoticePage = (props) => {
    // console.log(props)
    const ref=useRef();
    const clientHeight=document.documentElement.clientHeight;
    const [listData,setListData]=useState([]); //公告列表
    const [page,setPage]=useState({pageNum:1,pageSize:10});
    const [columnList,setcolumnList]=useState([]);  //栏目列表
    const [currentColumnid,setcurrentColumnid]=useState(undefined) //当前栏目id
    // const [Mvisible,setMvisible]=useState(false) //能否看见搜索模态框
    const [loading,setloading]=useState(true)

    const [total,setTotal]=useState(0);
    const [loadingMore,setLoadingMore]=useState(false);
    const [refreshId,setrefreshId]=useState(1);
    
    useEffect(()=>{
        //获取栏目列表
        getNoticecolumnlist().then(res=>{
            console.log(res)
            if(res.message==="success" &&res.data.list.length>0){
                // setcolumnList([{columnName:"所有",id:"all"},...res.data.list]);//存放栏目列表
                setcolumnList(res.data.list);//存放栏目列表
                getselectcolumnlist(res.data.list[0].id) //初始化第一个栏目的公告列表
                setcurrentColumnid(res.data.list[0].id)  //存放当前选择的栏目的id
            }else{
                Toast.fail(res.message,1)
            }
        })
        
    },[]);

    //获取某个栏目列表下的公告
    function getselectcolumnlist(columnId){
        setloading(true)
        setListData([])
        getNoticelist({...page,pageNum:1,noticeColumnId:columnId}).then(res=>{
            console.log(res)
            if(res.message==="success"){
                setListData(res.data.list)
                setTotal(res.data.total)
            }
        }).then(res => setloading(false))
    }
    //点击栏目选择公告列表
    function selectColumndata(tab,index){
        console.log(tab,page)
        setrefreshId(refreshId+1)
        setPage({...page,pageNum:1});
        getselectcolumnlist(tab.id)
        setcurrentColumnid(tab.id)//将选择栏目id存放
    }
     //点击跳转
    function gotoNoticedetail(item){
        
        const openurl =  `${window.location.origin}${process.env.PUBLIC_URL}/content/${item.id}`
        console.log(openurl)
        const temurl=window.encodeURI(openurl);
        window.yyzd.commandnative("yyzd://web=" + temurl);
        
        // props.history.push({
        //     pathname:`${props.match.path}/${item.id}`,
        //     query:{noticeColumnId:item.noticeColumnId}
        // })
   }
   
   async function refreshFn(){
    //    return false
    console.log("刷新")     
        // await getNoticelist({...page,pageNum:1,noticeColumnId:currentColumnid}).then(res=>{
        //     console.log(res)
        //     if(res.message==="success"){
        //         const {list}=res.data;
        //         setListData([...list]);
        //     }
        // })
    }
    async function loadMoreFn(){
        console.log("加载更多",currentColumnid) ;
        setLoadingMore(true);
        await getNoticelist({...page,pageNum:page.pageNum+1,noticeColumnId:currentColumnid}).then(res=>{
            console.log(res)
            if(res.message==="success"){
                const {list}=res.data;
                setListData([...listData,...list]);
                setPage({...page,pageNum:page.pageNum+1});
                setLoadingMore(false);
            }
        })
        
    }
    // console.log(listData.length,total,listData.length===total)
    return (
    <div className="App">
        {/* <NavBar
            mode="dark"
            // icon={<Icon type="left" />}
            // onLeftClick={() =>{props.history.goBack();} }
            // rightContent={[
            // <Icon  key="1" type="ellipsis" onClick={()=>{setMvisible(true)}} />
            // ]}
        >
            公告
        </NavBar> */}
        
        <Tabs tabs={columnList} onTabClick={selectColumndata} swipeable={false}
        initialPage={0} renderTab={tab => <span className="text_ellipsis">{tab.columnName}</span>}>
        </Tabs>

        <div style={{position:"relative",zIndex:"1"}}>
            <NoticeSearch searchfc={getNoticelist} currentid={currentColumnid}  resetlist={setListData}/>
        </div>
        <div>
        {/* style={{overflow:"hidden",height:"100%"}} */}
            <Bscroll ref={ref} height={clientHeight - 90} isNoMore={listData.length===total} loadingMore={loadingMore} betterScrollRefreshId={refreshId}
            refreshFn={refreshFn} loadMoreFn={loadMoreFn}>
                <List>
                    {listData.length>0?listData.map((item, index) => {
                        return (
                        <List.Item className="mt-5" key={index} align="top" wrap={false} onClick={() => gotoNoticedetail(item)} >
                            {item.noticeTitle}
                            <div className="content_">
                                <div className="content_1">
                                    <div className="content_1_c">{FilterHtml(item.noticeExplain)}</div>
                                    <span>{Changetime(item.applicantDate,2)} {item.applicantName}</span>
                                </div>
                            </div>
                        </List.Item>
                        );
                    }):<div className="nodata">{loading?<Icon type="loading"/>:
                    <Result img={<Icon type="cross-circle" className="spe" style={{ fill: '#efefef' }} />}  message="没有数据" />}</div>
                    }
                </List>
            </Bscroll>
        </div>
        {/* <NoticeSearch visible={Mvisible} onClose={()=>setMvisible(false)} searchfc={getNoticelist}
            currentid={currentColumnid}  resetlist={setListData}
        /> */}
    </div>
  );
};
export default NoticePage;
