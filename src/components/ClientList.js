/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Container, Loading } from './shared';
import ClientItem from './ClientItem';
import { mainApi } from '../services/api';

export default class ClientList extends Component {
  state = {
    clients: [],
    loading: true,
  };

  async componentDidMount() {
    const response = await mainApi.get('/clients');
    this.setState({
      clients: response.data,
      loading: false,
    });
  }

  render() {
    const { clients, loading } = this.state;
    if (loading) {
      return <Loading>Carregando...</Loading>;
    }
    return (
      <Container>
        <h1>Clientes</h1>
        <Table>
          <thead>
            <th>Id</th>
            <th>Nome</th>
            <th />
          </thead>
          {clients.map((client) => {
            return <ClientItem client={client} key={client.id} />;
          })}
        </Table>
      </Container>
    );
  }
}
