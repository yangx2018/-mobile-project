import React from 'react';
import './style.less';
import 'antd-mobile/dist/antd-mobile.css';
import { HashRouter,Route, Switch,BrowserRouter } from "react-router-dom";

// import SearchFilepack from './views/vdisk_searchfile';
import Vdisk_list from './views';

function App() {
  return (
    <>
          <BrowserRouter>
            <Switch>
               <Route path="/vidisk-h5/index.html" component={Vdisk_list}/>
            </Switch>
          </BrowserRouter>
    
    </>
  );
}

export default App;
