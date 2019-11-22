import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import ReactTable from 'react-table';
import requests from '../../requests/challenges';

class Globales extends Component {
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
    requests.getAll()
      .then(res => this.setState({ challenges: res }))
      .catch(err => console.log(err));
  }

  render() {
    const { challenges } = this.state;

    return (
      <React.Fragment>
        <Section
          heading="Challenges alrededor del mundo! 🌎"
          subhead="Todos los challenges creados desde el inicio de los tiempos"
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

export default Globales;
