import React from 'react';
import { shallow } from 'enzyme';
import AuthLink from './AuthLink';
import NavLink from '../NavLink';

describe('(component) AuthLink', () => {
  let wrapperTrue;
  let wrapperFalse;

  const propsTrue = { condition: true, children: 'test' };
  const propsFalse = { condition: false, children: 'test' };

  beforeEach(() => {
    wrapperTrue = shallow(<AuthLink {...propsTrue}/>);
    wrapperFalse = shallow(<AuthLink {...propsFalse}/>);
  });

  it('hould have a NavLink components for /logout when authenticated', () => {
    expect(wrapperTrue.contains(
      <NavLink to="/logout" children="test"/>
    )).to.be.true;
  });

  it('should have a NavLink components for /login when not authenticated', () => {
    expect(wrapperFalse.contains(
      <NavLink to="/login" children="test"/>
    )).to.be.true;
  });
});
