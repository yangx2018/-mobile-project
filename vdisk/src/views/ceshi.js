import React,{useState} from 'react';
import { ImagePicker } from 'antd-mobile';


const Addddss=()=>{
    const [aaa,setaaa] = useState([{
        url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        id: '2121',
      }, {
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '2122',
      }])
  function onChange(files, type, index){
    console.log(files, type, index);
    setaaa([...files])
  }
 

  
    return<div>
        <ImagePicker
                files={aaa}
                onChange={onChange}
                // onImageClick={(index, fs) => console.log(index, fs)}
                // selectable={aaa.length < 7}
                multiple={true}
                disableDelete={true}
                />
    </div>
        
        
  
}

export default Addddss