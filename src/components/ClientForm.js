/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Container, BaseButton, Form } from './shared';
import { mainApi } from '../services/api';

class ClientForm extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const { match } = this.props;
    const id = parseFloat(match.params.id);
    this.state = { id, name: '', email: '', birth: today };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.state.id > 0) {
      const response = await mainApi.get(`/clients/${this.state.id}`);
      const { name, email, birth } = response.data;
      this.setState({
        name,
        email,
        birth,
      });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const client = {
      name: this.state.name,
      email: this.state.email,
      birth: this.state.birth,
    };

    if (this.state.id > 0) {
      const response = await mainApi.put(`/clients/${this.state.id}`, client);
      this.setState({ name: '', email: '', birth: this.today });
      if (!response) {
        return alert(`Houve um erro de servidor!`);
      }
      if (response.status === 200) {
        return alert('Alterações salvas com sucesso.');
      }
      return alert(`Houve um erro: ${response.error}`);
    }
    const response = await mainApi.post('/clients', client);
    this.setState({ name: '', email: '', birth: this.today });
    if (!response) {
      return alert(`Houve um erro de servidor!`);
    }
    if (response.status === 201) {
      return alert('Cliente cadastrado com sucesso.');
    }
    return alert(`Houve um erro: ${response.error}`);
  }

  render() {
    return (
      <>
        <Container>
          <h1>
            <FaUsers />
            Clientes
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Digite o nome do usuário"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <br />
            <input
              type="email"
              placeholder="Digite o e-mail do usuário"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
            <br />
            <input
              type="text"
              placeholder="Digite a data de nascimento do usuário"
              value={this.state.birth}
              onChange={this.handleChange}
              name="birth"
            />
            <br />
            <BaseButton type="submit">Adicionar</BaseButton>
          </Form>
        </Container>
      </>
    );
  }
}
ClientForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

ClientForm.defaultProps = {
  match: { params: { id: '0' } },
};
export default ClientForm;
