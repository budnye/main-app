/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
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
    this.setState({ name: '', info: '', price: '', qnt: 0 });
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
            <FaShoppingBasket />
            Produtos
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="text"
              placeholder="Digite o nome do produto"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <br />
            <Input
              type="text"
              placeholder="Digite a descrição"
              value={this.state.info}
              onChange={this.handleChange}
              name="info"
            />
            <br />
            <Input
              type="number"
              placeholder="Digite o preço"
              value={this.state.price}
              onChange={this.handleChange}
              name="price"
            />
            <br />
            <Input
              type="number"
              placeholder="Digite a quantidade"
              value={this.state.qnt}
              onChange={this.handleChange}
              name="qnt"
            />
            <br />

            <BaseButton type="submit">Adicionar</BaseButton>
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
