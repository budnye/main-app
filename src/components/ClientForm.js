/* eslint-disable react/static-property-placement */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import { parseISO } from 'date-fns';
import { Container, BaseButton, Form } from './shared';
import { mainApi } from '../services/api';
import { formatDate } from '../util/date-format';

class ClientForm extends Component {
  constructor(props) {
    super(props);
    // const today = new Date();
    const { match } = this.props;
    const id = parseFloat(match.params.id);
    // const formatedDate = formatDate(today.toString());
    this.state = { id, name: '', email: '', birth: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.state.id > 0) {
      const response = await mainApi.get(`/clients/${this.state.id}`);
      const { name, email, birth } = response.data;
      const formatedDate = formatDate(birth);
      this.setState({
        name,
        email,
        birth: formatedDate,
      });
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const parsedDate = parseISO(this.state.birth);
    const client = {
      name: this.state.name,
      email: this.state.email,
      birth: parsedDate,
    };

    if (this.state.id > 0) {
      const response = await mainApi.put(`/clients/${this.state.id}`, client);
      this.setState({ name: '', email: '', birth: this.today });
      if (!response) {
        return alert(`Houve um erro de servidor!`);
      }
      if (response.status === 200) {
        this.setState({ name: '', email: '', birth: '' });
        return alert('Alterações salvas com sucesso.');
      }
      return alert(`Houve um erro: ${response.error}`);
    }
    const response = await mainApi.post('/clients', client);
    this.setState({ name: '', email: '', birth: '' });
    if (!response) {
      return alert(`Houve um erro de servidor!`);
    }
    if (response.status === 201) {
      this.setState({ name: '', email: '', birth: '' });

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
            <Input
              type="text"
              placeholder="Digite o nome do usuário"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
            <br />
            <Input
              type="email"
              placeholder="Digite o e-mail do usuário"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
            <br />
            <Input
              type="date"
              placeholder="Digite a data de nascimento do usuário"
              value={this.state.birth}
              onChange={this.handleChange}
              name="birth"
            />
            <br />
            <BaseButton type="submit">Salvar</BaseButton>
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
