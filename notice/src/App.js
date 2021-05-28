import React from "react";
import "antd-mobile/dist/antd-mobile.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import NoticePage_detail from "./views/notice_detail";
import NoticePage from "./views/notice";
import LoadingAuth from "./views/Authorize";
function App() {
  return (
    <>
      <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
        <Switch>
          <Route path="/content/:ID" component={NoticePage_detail} />
          <Route path="/authorize_" component={LoadingAuth} />
          <Route path="/" component={NoticePage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
