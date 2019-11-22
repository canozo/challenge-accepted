import React, { Component } from 'react';
import { Section } from 'react-landing-page';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import ReactTable from 'react-table';
import requests from '../../requests/challenges';

class Logros extends Component {
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
    }, {
      Header: 'Chat',
      accessor: 'correo',
      maxWidth: 57,
      Cell: val => this.getChatBtn(val.value),
    }];

    this.controller = new AbortController();
    this.getChallengeData = this.getChallengeData.bind(this);
    this.getChatBtn = this.getChatBtn.bind(this);
    this.toggle = this.toggle.bind(this);

    this.state = {
      challenges: [],
      modal: false,
      correo: '',
    };
  }

  componentDidMount() {
    this.getChallengeData();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  getChallengeData() {
    requests.getTakenBy()
      .then(res => this.setState({ challenges: res }))
      .catch(err => console.log(err));
  }

  getChatBtn(correo) {
    return (
      <Button color="info" onClick={() => this.toggle(correo)}>
        <span role="img" aria-label="chat">💬</span>
      </Button>
    );
  }

  toggle(correo) {
    const { modal } = this.state;
    this.setState({
      correo,
      modal: !modal,
    });
  }

  render() {
    const { challenges, modal, correo } = this.state;

    return (
      <React.Fragment>
        <Section
          heading="Tus Logros! 👏"
          subhead="Todos los challenges en los que has dejado tu marca!"
        />
        <ReactTable
          data={challenges}
          columns={this.columnas}
          filterable
        />
        <Modal isOpen={modal} toggle={() => this.toggle('')}>
          <ModalHeader toggle={() => this.toggle('')}>Ups!</ModalHeader>
          <ModalBody>
            Aún no estamos listos para ofrecerte mensajería con otros usuarios en la plataforma, lo sentimos!
            <br />
            <br />
            Mientras nos preparamos, puedes ponerte en contacto con este usuario enviando un correo a <b>{correo}</b>!
          </ModalBody>
          <ModalFooter>
            <Button block color="info" onClick={() => this.toggle('')}>Ok!</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Logros;
