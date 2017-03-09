import React, { Component } from 'react';
import styles from './styles';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick.bind(this), false);
  }

  handleClick(e) {
    if (!this.refWrapper) return;
    if (this.refWrapper.contains(event.target)) this.setState({ isOpen: !this.state.isOpen });
    else this.setState({ isOpen: false });
  }

  render() {
    const { className, ...otherProps } = this.props;
    const menuStatus = this.state.isOpen ? 'open' : 'closed';

    return (
      <div className={`${className} ${styles.menu}`}>
        <div ref={node => this.refWrapper = node} className={styles.humburger}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
        <div
          {...otherProps}
          className={`${styles.menuContainer} ${styles[menuStatus]}`}
        />
      </div>
    );
  }
}

export default Menu;
