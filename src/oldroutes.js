import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ClientsPage from './pages/ClientsPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import ClientRegisterPage from './pages/ClientsPage/ClientRegisterPage';
import ProductsRegisterPage from './pages/ProductsPage/ProductsRegisterPage';
import ClientForm from './components/ClientForm';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/clients" exact component={ClientsPage} />
        <Route path="/clients/register" exact component={ClientRegisterPage} />
        <Route path="/clients/:id" component={ClientForm} />

        <Route path="/products" exact component={ProductsPage} />
        <Route
          path="/products/register"
          exact
          component={ProductsRegisterPage}
        />
        <Route path="/orders" component={OrdersPage} />
      </Switch>
    </BrowserRouter>
  );
}
