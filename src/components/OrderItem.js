/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

export default class OrderItem extends Component {
  state = {
    order: {},
    client: {},
    products: [],
  };

  componentDidMount() {
    this.setState({
      order: this.props.order,
      client: this.props.order.client,
      products: this.props.order.products,
    });
  }

  render() {
    const { order, client, products } = this.state;
    return (
      <tr>
        <th>{order.orderId}</th>
        <th>{client.name}</th>
        <th>{products.length}</th>
        <th>{order.dueDate}</th>
      </tr>
    );
  }
}
