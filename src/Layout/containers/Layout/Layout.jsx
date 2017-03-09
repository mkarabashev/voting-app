import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Header from '../Header';
import Footer from '../../components/Footer';
import windowSizeChanged from '../../actions';

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    windowSizeChanged: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.meta = [
      { name: "charset", content: "utf-8" },
      { name: "description", content: "React Application" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:type", content: "boilerplate" }
    ];

    this.handleWindowSize.bind(this);
  }

  componentDidMount() {
    this.handleWindowSize();
    window.addEventListener('resize', this.handleWindowSize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSize.bind(this) , false);
  }

  handleWindowSize() {
    this.props.windowSizeChanged(window.innerWidth)
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
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  windowSizeChanged: width => dispatch(windowSizeChanged(width))
})

export default connect(null, mapDispatchToProps)(Layout);
