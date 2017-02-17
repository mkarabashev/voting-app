import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Helmet from 'react-helmet';
import styles from './styles';

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
        <h2 className={styles.colorful}>React Universal App</h2>
        <IndexLink to="/"> Home </IndexLink>
        <Link to="/list"> List </Link>
        <Link to="/about"> About </Link>
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
