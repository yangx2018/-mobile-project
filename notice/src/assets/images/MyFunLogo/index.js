import code from './code.png';
import logistics from './logistics.png';
import order from './order.png';
import recive from './recive.png';
import palletSearch from './palletSearch.png'
import packages from './packages.png';
import Store from './store.png';
import empty from './empty.jpg'
export default{
    getIcon,
}
function getIcon(icon){
  switch(icon){
      case "code":
          return code;
      case "logistics":
          return logistics;   
      case "order":
          return order;  
      case "recive":
          return recive; 
      case "palletSearch":
          return palletSearch;  
      case "packages":
          return packages;  
      case "store":
          return Store;
      case "empty":
          return empty;           
      default :
          return code;   
  }
}