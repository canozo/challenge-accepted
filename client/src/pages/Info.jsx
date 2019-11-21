import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Feature,
  Flex,
  Heading,
  Box,
  Hero,
  CallToAction,
} from 'react-landing-page';

import { AuthContext } from '../context/Auth';

class Principal extends Component {
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
      <Hero backgroundImage="forest.jpeg">
        <Box
          color="white"
        >
          <br />
          <br />
          <br />
          <br />
          <Heading textAlign="center">Qué es Challenge Accepted?</Heading>
          <Flex flexWrap="wrap" justifyContent="center">
            <Feature icon="📬" description="Postea retos online para otras personas.">
              Challenge
            </Feature>
            <Feature icon="💰" description="Completa retos a cambio de ganancias.">
              Accept
            </Feature>
            <Feature icon="🕒" description="Si quieres hacer algo por tu comunidad pero no tienes el tiempo, nosotros te ayudamos!">
              Tiempo
            </Feature>
            <Feature icon="🥳" description="Si ocupas un empujón para hacer actividades de bien social, también de ayudamos!">
              Recompensas
            </Feature>
          </Flex>
        </Box>
        <Flex mt={3} color="white">
          <CallToAction
            onClick={() => this.setState({ redirectHome: true })}
            bg="grey"
            mr={3}
          >
            Volver
          </CallToAction>
          <CallToAction
            onClick={() => this.setState({ redirectApp: true })}
          >
            Acceder
          </CallToAction>
        </Flex>
      </Hero>
    );
  }
}

Principal.contextType = AuthContext;

export default Principal;
