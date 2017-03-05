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

  it('should have a NavLink component', () => {
    expect(wrapperTrue.find(NavLink))
      .to.exist.with.deep.property('node.props.children', 'test');

    expect(wrapperFalse.find(NavLink))
      .to.exist.with.deep.property('node.props.children', 'test');
  });

  it('should point to /logout when authenticated', () => {
    expect(wrapperTrue.find(NavLink))
      .to.exist.with.deep.property('node.props.to', '/logout');
  });

  it('should point to /login when not authenticated', () => {
    expect(wrapperFalse.find(NavLink))
    .to.exist.with.deep.property('node.props.to', '/login');
  });
});
