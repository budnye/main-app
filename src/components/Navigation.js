import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Main APP</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Clientes
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/clients">
                  <DropdownItem>Listagem</DropdownItem>
                </Link>
                <Link to="/clients/register">
                  <DropdownItem>Cadastro</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Produtos
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/products">
                  <DropdownItem>Listagem</DropdownItem>
                </Link>
                <Link to="/products/register">
                  <DropdownItem>Cadastro</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pedidos
              </DropdownToggle>
              <DropdownMenu right>
                <Link to="/orders">
                  <DropdownItem>Listagem</DropdownItem>
                </Link>
                <Link to="/orders/register">
                  <DropdownItem>Cadastro</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
