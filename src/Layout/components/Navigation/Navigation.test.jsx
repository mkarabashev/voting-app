import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';
import Navbar from '../Navbar';
import Menu from '../../containers/Menu';

describe('(components) Navigation', () => {
  let wrapper;
  const propsTrue = { condition: true };
  const propsFalse = { condition: false };

  beforeEach(() => {
    wrapperTrue = shallow(<Navigation {...propsTrue}/>)
    wrapperFalse = shallow(<Navigation {...propsFalse}/>)
  })

  it('should point to Navbar when the screen is big enough', () => {
    expect(wrapperTrue.contains(<Navbar/>)).to.be.true;
  });
  
  it('should point to Menu when the screen is too small', () => {
    expect(wrapperFalse.contains(<Menu/>)).to.be.true;
  });
});
