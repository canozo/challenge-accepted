import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthConsumer } from '../context/Auth';
import Loading from '../components/Loading';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('auth-token');
    props.context.logout();
  }

  render() {
    return (
      <AuthConsumer>
        {(context) => {
          if (!context.token) {
            return <Loading text="Saliendo" />;
          }

          return <Redirect to="/" />;
        }}
      </AuthConsumer>
    );
  }
}

Logout.propTypes = {
  context: PropTypes.shape({
    logout: PropTypes.func,
  }),
};

Logout.defaultProps = {
  context: {
    logout: () => {},
  },
};

export default Logout;
