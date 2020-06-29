/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Loading } from './shared';
import OrderItem from './OrderItem';
import { orderApi } from '../services/api';

export default class OrdersList extends Component {
  state = {
    orders: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await orderApi.get('/orders');
    this.setState({
      orders: response.data,
      loading: false,
    });
  }

  render() {
    const { orders, loading } = this.state;
    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <h1>Pedidos</h1>
        <Table>
          <thead>
            <th>Id</th>
            <th>Cliente</th>
            <th>Produtos</th>
            <th>Vencimento</th>
          </thead>
          {orders.map((order) => {
            return <OrderItem order={order} key={order.orderId} />;
          })}
        </Table>
      </Container>
    );
  }
}
