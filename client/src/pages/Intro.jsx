import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import ReactTable from 'react-table';
import { AuthContext } from '../context/Auth';
import requests from '../requests/challenges';

class Intro extends Component {
  constructor(props) {
    super(props);

    this.columnas = [{
      Header: 'Challenge',
      accessor: 'titulo',
      maxWidth: 200,
    }, {
      Header: 'Retador',
      accessor: 'retador',
      maxWidth: 150,
    }, {
      Header: 'Descripción',
      accessor: 'descripcion',
    }, {
      Header: 'Recompensa',
      accessor: 'recompensa',
      Cell: val => `Lps. ${val.value}.00`,
      maxWidth: 120,
    }];

    this.controller = new AbortController();
    this.getChallengeData = this.getChallengeData.bind(this);

    this.state = {
      challenges: [],
    };
  }

  componentDidMount() {
    this.getChallengeData();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  getChallengeData() {
    requests.getAvailable()
      .then(res => this.setState({ challenges: res }))
      .catch(err => console.log(err));
  }

  render() {
    const { challenges } = this.state;
    const { user } = this.context;

    const subheadcomp = (
      <React.Fragment>
        Bienvenido a Challenge Accepted!
        <br />
        Challenges Disponibles:
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Section
          heading={`Hola, ${user.nombre.split(' ')[0]}! 🎉`}
          subhead={subheadcomp}
        />
        <ReactTable
          data={challenges}
          columns={this.columnas}
          filterable
        />
      </React.Fragment>
    );
  }
}

Intro.contextType = AuthContext;

export default Intro;
