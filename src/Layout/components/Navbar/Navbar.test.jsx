import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './Navbar';
import styles from  './styles';

describe('(components) Navbar', () => {
  let wrapper;
  const props = {
    className: 'testClass',
    children: 'testChild',
    onClick: Function.prototype
  };

  beforeEach(() => {
    wrapperEmpty = shallow(<Navbar/>);
    wrapperWithProps = shallow(<Navbar {...props}/>);
  });

  it('should contain an empty styled div element when given no props', () => {
    expect(wrapperEmpty.contains(
      <div className={`undefined ${styles.navbar}`}/>
    )).to.be.true;
  });

  it('should allow parent component to include its own props', () => {
    expect(wrapperWithProps.contains(
      <div onClick={Function.prototype} className={`testClass ${styles.navbar}`}>
        testChild
      </div>
    )).to.be.true;
  });
});
