import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Header from '../../containers/Header';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  constructor(props) {
    super(props);

    this.meta = [
      { name: "charset", content: "utf-8" },
      { name: "description", content: "React Application" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "boilerplate" }
    ];
  }

  render() {
    return (
      <div>
        <Helmet
          titleTemplate={"%s | React"}
          meta={this.meta}
        />
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
