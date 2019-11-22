import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import ReactTable from 'react-table';
import { Button } from 'reactstrap';
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
      maxWidth: 120,
      Cell: val => `Lps. ${val.value}.00`,
    }, {
      Header: 'Opciones',
      accessor: 'id_challenge',
      maxWidth: 105,
      Cell: val => this.getBotones(val.value)
    }];

    this.controller = new AbortController();
    this.getChallengeData = this.getChallengeData.bind(this);
    this.getBotones = this.getBotones.bind(this);
    this.aceptar = this.aceptar.bind(this);
    this.rechazar = this.rechazar.bind(this);

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

  getBotones(id) {
    return (
      <React.Fragment>
        <Button color="success" onClick={() => this.aceptar(id)}>
          <span role="img" aria-label="thumbs up">👍</span>
        </Button>
        {' '}
        <Button color="danger" onClick={() => this.rechazar(id)}>
        <span role="img" aria-label="thumbs down">👎</span>
        </Button>
      </React.Fragment>
    );
  }

  aceptar(id) {
    const payload = { id };
    requests.accept(this.controller.signal, payload)
      .then(() => this.getChallengeData())
      .catch(err => console.log(err));
  }

  rechazar(id) {
    const payload = { id };
    requests.deny(this.controller.signal, payload)
      .then(() => this.getChallengeData())
      .catch(err => console.log(err));
  }

  render() {
    const { challenges } = this.state;
    const { user } = this.context;

    return (
      <React.Fragment>
        <Section
          heading={`🎉 Bienvenido a Challenge Accepted, ${user.nombre.split(' ')[0]}! 🎉`}
          subhead="Challenges Disponibles:"
        />
        <ReactTable
          data={challenges}
          columns={this.columnas}
        />
      </React.Fragment>
    );
  }
}

Intro.contextType = AuthContext;

export default Intro;
