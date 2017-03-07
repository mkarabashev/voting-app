import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { addString } from '../actions';

class List extends Component {
  componentDidMount() {
    this.socket = io('http://localhost:8080');
    this.socket.on('connect', () => this.socket.emit('join', 'hello from client'));
    this.socket.on('message', data => {
      this.props.addString(data);
    })
  }

  componentWillUnmount() {
    console.log('here')
    this.socket.disconnect()
  }

  handleInput(e) {
    e.preventDefault();
    const input = this.input;
    const str = input && input.value
      ? input.value.trim()
      : null;
      input.value = '';

    if (str) this.props.addString(str);
  }

  render() {
    const { list, addString } = this.props;

    return (
      <section>
        <Helmet title="List"/>
        <h3>List</h3>
        <form onSubmit={e => e.preventDefault()}>
          <input ref={node => this.input = node}/>
          <button onClick={this.handleInput.bind(this)}>Submit</button>
        </form>
        {list && list.map((str, i) =>
          <p key={i}>{str}</p>
        )}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  list: state.listReducer
});

const mapDispatchToProps = dispatch => ({
  addString: (str) => dispatch(addString(str))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
