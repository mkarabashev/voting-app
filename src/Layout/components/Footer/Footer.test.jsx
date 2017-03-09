import React from 'react';
import { shallow } from 'enzyme';
import Footer from './Footer';
import styles from './styles';

describe('(components) Footer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer/>);
  });

  it('should have a footer element', () => {
    const footerElement = wrapper.find('footer');
    expect(footerElement).to.exist;
    expect(footerElement.hasClass(styles.footer)).to.be.true;
  });

  it('should have a div element with text saying who built the app', () => {
    expect(wrapper.find(`footer .${styles.content}`).children())
      .to.exist.with.property('nodes')
      .that.is.an('array').with.lengthOf(2)
      .that.includes('designed and built by ');
  });

  it('should contain a link pointing to my github page', () => {
    const aElement = wrapper.find(`.${styles.content} a`)
    expect(aElement).to.exist.with.property('props');
    expect(aElement.props()).to.have.property('href', 'https://github.com/mkarabashev/');
    expect(aElement.props()).to.have.property('children', 'Maxim Karabashev');
  });
});
