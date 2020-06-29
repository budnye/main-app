import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';

const Main = (props) => {
  const { children } = props;

  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
