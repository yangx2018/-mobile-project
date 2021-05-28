import React from 'react';
import './style.less';
import 'antd-mobile/dist/antd-mobile.css';
import { Route, Switch,BrowserRouter } from "react-router-dom";

// import SearchFilepack from './views/vdisk_searchfile';
import Vdisk_list from './views';
import LoadingAuth from "./views/Authorize";

function App() {
  return (
    <>
          <BrowserRouter  basename={`${process.env.PUBLIC_URL}`}>
            <Switch>
               <Route path="/authorize_" component={LoadingAuth} />
               <Route path="/" component={Vdisk_list}/>
            </Switch>
          </BrowserRouter>
    
    </>
  );
}

export default App;
