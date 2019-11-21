import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Hero,
  CallToAction,
  Flex,
  Heading,
  Subhead,
} from 'react-landing-page';
import { AuthContext } from '../context/Auth';

class Principal extends Component {
  constructor(props) {
    super(props);

    this.controller = new AbortController();

    this.state = {
      redirectInfo: false,
      redirectApp: false,
    };
  }


  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const {
      redirectInfo,
      redirectApp,
    } = this.state;

    if (redirectInfo) {
      return <Redirect to="/info" />
    }

    if (redirectApp) {
      return <Redirect to="/app" />
    }

    return (
      <Hero
        color="white"
        backgroundImage="brick-wall.jpeg"
        bg="black"
        bgOpacity={0.5}
      >
        <Heading>Challenge Accepted</Heading>
        <Subhead fontSize={[2, 3]}>Haz un buen por tu comunidad desde tu casa.</Subhead>
        <Flex mt={3}>
          <CallToAction
            onClick={() => this.setState({ redirectInfo: true })}
            bg="grey"
            mr={3}
          >
            Más información
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
