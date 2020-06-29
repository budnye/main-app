/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Container, BaseButton, Form } from './shared';
import { mainApi } from '../services/api';

class ProductsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { productName: '', info: '', price: '', qnt: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const product = {
      name: this.state.productName,
      info: this.state.info,
      price: this.state.price,
      qnt: this.state.qnt,
    };
    const response = await mainApi.post('/products', product);
    this.setState({ productName: '', info: '', price: '', qnt: 0 });
    if (!response) {
      return alert(`Houve um erro de servidor!`);
    }
    if (response.status === 201) {
      return alert('Produto cadastrado com sucesso.');
    }
    return alert(`Houve um erro: ${response.error}`);
  }

  render() {
    return (
      <>
        <Container>
          <h1>
            <FaUsers />
            Produtos
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Digite o nome do produto"
              value={this.state.productName}
              onChange={this.handleChange}
              name="productName"
            />
            <br />
            <input
              type="text"
              placeholder="Digite a descrição"
              value={this.state.info}
              onChange={this.handleChange}
              name="info"
            />
            <br />
            <input
              type="number"
              placeholder="Digite o preço"
              value={this.state.price}
              onChange={this.handleChange}
              name="price"
            />
            <br />
            <input
              type="number"
              placeholder="Digite a quantidade"
              value={this.state.qnt}
              onChange={this.handleChange}
              name="qnt"
            />
            <BaseButton type="submit">Adicionar</BaseButton>
          </Form>
        </Container>
      </>
    );
  }
}

export default ProductsForm;
