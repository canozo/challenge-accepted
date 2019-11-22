import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Section } from 'react-landing-page';

import { AuthContext } from '../context/Auth';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      redirectHome: false,
      redirectApp: false,
    };
  }


  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const {
      redirectHome,
      redirectApp,
    } = this.state;

    const { user } = this.context;

    if (redirectHome) {
      return <Redirect to="/" />
    }

    if (redirectApp) {
      return <Redirect to="/app" />
    }

    return (
      <Section
        heading={`Hola, ${user.nombre.split(' ')[0]}!`}
        subhead="Bienvenido a Challenge Accepted! 🎉"
      />
    );
  }
}

Intro.contextType = AuthContext;

export default Intro;
