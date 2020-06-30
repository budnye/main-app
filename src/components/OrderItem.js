/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { formatDate } from '../util/date-format';

export default class OrderItem extends Component {
  state = {
    order: {},
    client: {},
    products: [],
    dueDate: '',
  };

  componentDidMount() {
    this.setState({
      order: this.props.order,
      client: this.props.order.client,
      products: this.props.order.products,
    });
    const formatDueDate = formatDate(this.props.order.dueDate, false, true);
    this.setState({
      dueDate: formatDueDate,
    });
  }

  render() {
    const { order, client, products, dueDate } = this.state;
    return (
      <tr>
        <th>{order.orderId}</th>
        <th>{client.name}</th>
        <th>{products.length}</th>
        <th>{dueDate}</th>
      </tr>
    );
  }
}
