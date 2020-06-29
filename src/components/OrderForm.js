/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaCubes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { Container, BaseButton, Form } from './shared';
import { mainApi, orderApi } from '../services/api';
import { formatDate } from '../util/date-format';

class OrderForm extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    const orderId = parseFloat(match.params.id);
    const today = new Date();
    this.state = {
      orderId,
      dueDate: today,
      products: [],
      client: {},
      selectedProducts: [],
      clients: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const [getClients, getProducts] = await Promise.all([
      mainApi.get('/clients'),
      mainApi.get('/products'),
    ]);
    this.setState({
      clients: getClients.data,
      products: getProducts.data,
    });
    console.log(this.state.orderId);
    console.log('out');
    if (this.state.orderId > 0) {
      console.log('inside');
      const response = await orderApi.get(`/orders/${this.state.orderId}`);
      const { dueDate, client, products } = response.data;
      const formatedDate = formatDate(dueDate);
      this.setState({
        dueDate: formatedDate,
        client,
        products,
      });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const { order } = this.state;

    if (order.orderId > 0) {
      const response = await orderApi.put(`/orders/${order.orderId}`, order);
      this.setState({ orderId: 0, order: {}, client: {}, products: {} });

      if (response.status === 200 && response) {
        return alert('Alterações salvas com sucesso.');
      }
      return alert(`Houve um erro: ${response.error}`);
    }
    const response = await order.post('/orders', order);
    this.setState({ orderId: 0, order: {}, client: {}, products: {} });

    if (response.status === 201 && response) {
      return alert('Cliente cadastrado com sucesso.');
    }
    return alert(`Houve um erro: ${response.error}`);
  }

  render() {
    const { clients } = this.state;
    return (
      <>
        <Container>
          <h1>
            <FaCubes />
            Pedidos
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <Input
              type="date"
              value={this.state.dueDate}
              onChange={this.handleChange}
              name="dueDate"
            />
            <br />
            <Input
              type="select"
              placeholder="Selecione o cliente"
              value={this.state.client.id}
              onChange={this.handleChange}
              name="client"
            >
              {clients.map((client) => {
                return <option value="client.id">{client.name}</option>;
              })}
            </Input>
            <br />
            <Input
              type="select"
              placeholder="Selecione o produto"
              value={this.state.products}
              onChange={this.handleChange}
              name="products"
            >
              {clients.map((client) => {
                return <option value="client.id">{client.name}</option>;
              })}
            </Input>
            <br />
            <BaseButton type="submit">Salvar</BaseButton>
          </Form>
        </Container>
      </>
    );
  }
}
OrderForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  order: PropTypes.shape({
    orderId: PropTypes.number,
    createdAt: PropTypes.instanceOf(Date),
    dueDate: PropTypes.instanceOf(Date),
    isCanceled: PropTypes.bool,
  }),
  client: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    birth: PropTypes.instanceOf(Date),
  }),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      info: PropTypes.string,
      price: PropTypes.number,
      qnt: PropTypes.number,
    })
  ),
};

OrderForm.defaultProps = {
  match: { params: { id: '0' } },
  order: {
    orderId: 0,
    createdAt: '',
    dueDate: '',
    isCanceled: false,
  },
  client: {
    id: 0,
    name: '',
    email: '',
    birth: '',
  },
  products: [
    {
      id: 0,
      info: '',
      price: 0,
      qnt: 0,
    },
  ],
};
export default OrderForm;
