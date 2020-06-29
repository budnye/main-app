/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { BaseButton } from './shared';
import { formatCurrency } from '../util/currency-format';

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
    const price = formatCurrency(product.price);
    return (
      <tr>
        <th>{product.id}</th>
        <th>{product.name}</th>
        <th>{price}</th>
        <th>{product.qnt}</th>
        <th>
          <Link to={`/products/${product.id}`}>
            <BaseButton>
              <FaEdit />
            </BaseButton>
          </Link>
        </th>
      </tr>
    );
  }
}
