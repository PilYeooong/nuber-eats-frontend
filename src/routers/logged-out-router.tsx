import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotFound } from '../pages/404';
import Login from '../pages/login';
import Signup from '../pages/signup';

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
