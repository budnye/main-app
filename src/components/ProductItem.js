/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

export default class ProductsItem extends Component {
  state = {
    product: {},
  };

  componentDidMount() {
    this.setState({
      product: this.props.product,
    });
  }

  render() {
    const { product } = this.state;

    return (
      <tr>
        <th>{product.id}</th>
        <th>{product.name}</th>
        <th>R$ {product.price}</th>
        <th>{product.qnt}</th>
      </tr>
    );
  }
}
