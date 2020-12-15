import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/header';
import { useMe } from '../hooks/useMe';
import { NotFound } from '../pages/404';
import ConfirmEmail from '../pages/user/confirm-email';
import EditProfile from '../pages/user/edit-profile';
import Search from '../pages/client/search';
import { Category } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';

const ClientRoutes = [
    <Route key={1} exact path="/">
      <Restaurants />
    </Route>,
    <Route key={2} exact path="/confirm">
      <ConfirmEmail />
    </Route>,
    <Route key={3} exact path="/edit-profile">
      <EditProfile />
    </Route>,
    <Route key={4} exact path="/search">
      <Search />
    </Route>,
    <Route key={5} exact path="/category/:slug">
      <Category />
    </Route>,
    <Route key={6} exact path="/restaurant/:id">
      <Restaurant />
    </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
