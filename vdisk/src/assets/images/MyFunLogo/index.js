import empty from './empty.jpg'
import filepack from './filepack.png'
import rename from './rename.png'
import deleteimg from './delete.png'
import emptyfile from './emptyfile.png'
import buildfilelogo from './buildfilelogo.png'
import buildfilepack from './buildfilepack.png'
import downloadimg from './download.png'
import filedocx from './filedocx.png'
import fileimg from './fileimg.png'
import filepdf from './filepdf.png'
import fileppt from './fileppt.png'
import fileexcel from './fileexcel.png'
import filezip from './filezip.png'
import fileunknown from './fileunknown.png'

export default{
    getIcon,getfileimg,
}
function getIcon(icon){
  switch(icon){
      case "empty":
          return empty;   
      case "filepack":
          return filepack;
      case "rename":
          return rename;    
      case "deleteimg":
          return deleteimg;     
      case "emptyfile":
          return emptyfile;    
      case "buildfilelogo":
          return buildfilelogo;    
      case "buildfilepack":
            return buildfilepack;
      case "downloadimg":
            return downloadimg;   
      default :
          return empty;   
  }
}
function getfileimg(icon){
    switch(icon){
        case "null":
            return fileunknown;
        case "docx":
            return filedocx;
        case "jpeg":
            return fileimg;
        case "png":
            return fileimg;
        case "jpg":
            return fileimg;
        case "pdf":
            return filepdf;
        case "ppt":
            return fileppt;
        case "xlsx":
            return fileexcel;
        case "zip":
            return filezip;
        case "rar":
            return filezip;
        default :
            return fileunknown;
    }
  }