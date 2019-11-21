import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AuthedRoute, NotAuthedRoute } from '../routes';
import Landing from './Landing';
import Info from './Info';
import App from './App';
import Login from './Login';
import Logout from './Logout';
import NotFound from './NotFound';

function Index() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/info" component={Info} />
      <NotAuthedRoute path="/login" component={Login} />
      <AuthedRoute path="/logout" component={Logout} />
      <AuthedRoute path="/app" component={App} />
      <Route render={() => <NotFound />} />
    </Switch>
  );
}

export default Index;
