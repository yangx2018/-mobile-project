import React from 'react';
// import './assets/less/index.less';
import 'antd-mobile/dist/antd-mobile.css';
import { HashRouter,Route, Switch,BrowserRouter} from "react-router-dom";


import NoticePage_detail from './views/notice_detail';
import NoticePage from './views/notice';
function App() {
  return (
    <>
          <BrowserRouter>
            <Switch>
               <Route path="/notice-h5/index.html/:ID" component={NoticePage_detail}/>
               <Route path="/notice-h5/index.html" component={NoticePage}/>
            </Switch>
          </BrowserRouter>
    
    </>
  );
}

export default App;
