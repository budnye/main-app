import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import ClientList from './components/ClientList';
import RouteWithLayout from './RouteWithLayout';
import MainLayout from './layouts/Main';
import ClientForm from './components/ClientForm';
import ProductsList from './components/ProductsList';
import ProductsForm from './components/ProductsForm';
import OrdersList from './components/OrdersList';
import OrderForm from './components/OrderForm';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/clients" />

        <RouteWithLayout
          exact
          path="/clients"
          layout={MainLayout}
          component={ClientList}
        />

        <RouteWithLayout
          path="/clients/register"
          exact
          layout={MainLayout}
          component={ClientForm}
        />

        <RouteWithLayout
          path="/clients/:id"
          exact
          layout={MainLayout}
          component={ClientForm}
        />

        <RouteWithLayout
          path="/products"
          exact
          layout={MainLayout}
          component={ProductsList}
        />

        <RouteWithLayout
          path="/products/register"
          exact
          layout={MainLayout}
          component={ProductsForm}
        />

        <RouteWithLayout
          path="/products/:id"
          exact
          layout={MainLayout}
          component={ProductsForm}
        />

        <RouteWithLayout
          path="/orders"
          exact
          layout={MainLayout}
          component={OrdersList}
        />

        <RouteWithLayout
          path="/orders/register"
          exact
          layout={MainLayout}
          component={OrderForm}
        />

        <RouteWithLayout
          path="/orders/:id"
          exact
          layout={MainLayout}
          component={OrderForm}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
