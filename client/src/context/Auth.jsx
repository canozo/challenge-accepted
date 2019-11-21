import React from 'react';
import PropTypes from 'prop-types';
import requests from '../requests/auth';

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer;

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.logout = this.logout.bind(this);
    this.verify = this.verify.bind(this);
    this.initVerify = this.initVerify.bind(this);

    this.state = {
      loading: true,
      expired: false,
    };

    const token = localStorage.getItem('auth-token');
    this.initVerify(token);
  }

  async login(email, password) {
    return requests.login(email, password)
      .then((res) => {
        localStorage.setItem('auth-token', res.token);
        this.initVerify(res.token);
      });
  }

  async register(nombres, email, password) {
    return requests.register(nombres, email, password)
      .then((res) => {
        localStorage.setItem('auth-token', res.token);
        this.initVerify(res.token);
      });
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.setState({
      token: null,
      logged: false,
      user: null,
      loading: false,
    });
  }

  verify() {
    const { token } = this.state;
    requests.verify(token)
      .then()
      .catch(() => {
        const expired = localStorage.getItem('auth-token') !== null;
        localStorage.removeItem('auth-token');

        this.setState({
          token: null,
          logged: false,
          user: null,
          loading: false,
          expired,
        });
      });
  }

  initVerify(token) {
    requests.verify(token)
      .then((res) => {
        this.setState({
          token,
          logged: true,
          user: res,
          loading: false,
        });
      })
      .catch(() => {
        const expired = localStorage.getItem('auth-token') !== null;
        localStorage.removeItem('auth-token');

        this.setState({
          token: null,
          logged: false,
          user: null,
          loading: false,
          expired,
        });
      });
  }

  render() {
    const { children } = this.props;
    const {
      token, logged, user, loading, expired,
    } = this.state;

    const value = {
      token,
      logged,
      user,
      loading,
      expired,
      login: this.login,
      register: this.register,
      logout: this.logout,
      verify: this.verify,
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthConsumer, AuthProvider };
