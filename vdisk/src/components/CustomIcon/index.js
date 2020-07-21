import React from 'react';

const CustomIcon = ({data,classname="myicon_default",onClick}) => (
       <img src={data} className={classname} alt="" onClick={()=>onClick()} />  
     );
export default CustomIcon;    