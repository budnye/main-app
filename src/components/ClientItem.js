/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BaseButton } from './shared';

export default class ClientItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
    };
  }

  componentDidMount() {
    const { client } = this.props;
    this.setState({
      client,
    });
  }

  render() {
    const { client } = this.state;

    return (
      <tr>
        <th>{client.id}</th>
        <th>{client.name}</th>
        <th>
          <Link to={`/clients/${client.id}`}>
            <BaseButton>
              <FaEdit />
            </BaseButton>
          </Link>
        </th>
      </tr>
    );
  }
}
