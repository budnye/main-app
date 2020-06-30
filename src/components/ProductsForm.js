/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import { Container, BaseButton, Form } from './shared';
import { mainApi } from '../services/api';

class ProductsForm extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const id = parseFloat(match.params.id);
    this.state = { id, name: '', info: '', price: '', qnt: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.state.id > 0) {
      const response = await mainApi.get(`/products/${this.state.id}`);
      const { name, info, price, qnt } = response.data;
      this.setState({
        name,
        info,
        price,
        qnt,
      });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const product = {
      name: this.state.name,
      info: this.state.info,
      price: this.state.price,
      qnt: this.state.qnt,
    };
    const response = await mainApi.post('/products', product);
    this.setState({ name: '', info: '', price: '', qnt: '' });
    if (response.status === 201 && response.data) {
      return alert('Produto cadastrado com sucesso.');
    }
    return alert(`Houve um erro: ${response.error}`);
  }

  render() {
    return (
      <>
        <Container>
          <h1>
            <FaShoppingBasket />
            Produtos
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <Label for="name">Nome</Label>

            <Input
              type="text"
              placeholder="Digite o nome do produto"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <br />
            <Label for="info">Descrição</Label>

            <Input
              type="text"
              placeholder="Digite a descrição"
              value={this.state.info}
              onChange={this.handleChange}
              name="info"
            />
            <br />
            <Label for="price">Preço</Label>

            <Input
              type="number"
              placeholder="Digite o preço"
              value={this.state.price}
              onChange={this.handleChange}
              name="price"
            />
            <br />
            <Label for="qnt">Quantidade</Label>

            <Input
              type="number"
              placeholder="Digite a quantidade"
              value={this.state.qnt}
              onChange={this.handleChange}
              name="qnt"
            />
            <br />
            <BaseButton type="submit">Salvar</BaseButton>
            <br />
          </Form>
        </Container>
      </>
    );
  }
}
ProductsForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ProductsForm.defaultProps = {
  match: { params: { id: '0' } },
};
export default ProductsForm;
