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

    if (redirectHome) {
      return <Redirect to="/" />
    }

    if (redirectApp) {
      return <Redirect to="/app" />
    }

    return (
      <Section
        heading="Bienvenido a Challenge Accepted! 🎉"
        subhead="Revisa el menu superior para continuar"
      />
    );
  }
}

Intro.contextType = AuthContext;

export default Intro;
