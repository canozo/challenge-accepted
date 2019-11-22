import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import ReactTable from 'react-table';
import requests from '../../requests/challenges';

class Mios extends Component {
  constructor(props) {
    super(props);

    this.columnas = [{
      Header: 'Challenge',
      accessor: 'titulo',
      maxWidth: 200,
    }, {
      Header: 'Aceptado por',
      accessor: 'retado',
      maxWidth: 150,
      Cell: val => console.log(val.val),
    }, {
      Header: 'Descripción',
      accessor: 'descripcion',
    }, {
      Header: 'Recompensa',
      accessor: 'recompensa',
      maxWidth: 120,
      Cell: val => `Lps. ${val.value}.00`,
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
    requests.getBy()
      .then(res => this.setState({ challenges: res }))
      .catch(err => console.log(err));
  }

  render() {
    const { challenges } = this.state;

    const headcomp = (
      <React.Fragment>
        Tus Challenges!
        {' '}
        <span role="img" aria-label="cool">😎</span>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Section
          heading={headcomp}
          subhead="Todos los challenges que has patrocinado!"
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

export default Mios;
