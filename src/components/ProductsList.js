/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Loading } from './shared';
import ProductItem from './ProductItem';
import { mainApi } from '../services/api';

export default class ProductsList extends Component {
  state = {
    products: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await mainApi.get('/products');
    this.setState({
      products: response.data,
      loading: false,
    });
  }

  render() {
    const { products, loading } = this.state;
    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <h1>Produtos</h1>
        <Table>
          <thead>
            <th>Id</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
          </thead>
          {products.map((product) => {
            return <ProductItem product={product} key={product.id} />;
          })}
        </Table>
      </Container>
    );
  }
}
