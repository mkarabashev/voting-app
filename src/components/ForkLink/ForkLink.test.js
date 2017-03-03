import React from 'react';
import { shallow } from 'enzyme';
import ForkLink from './ForkLink';
import NavLink from '../NavLink';

describe('(components) ForkLink', () => {
  let _wrapper;
  let props = { condition: true, children: 'test' }
  const Forked = ForkLink('path1', 'path2');

  beforeEach(() => {
    _wrapper = shallow(<Forked {...props}/>)
  });

  it('should have a NavLink component with a label description', () => {
    const component = _wrapper.find(NavLink);
    expect(component).to.exist;
    expect(component.children().node).to.match(/test/);
  });

  it('should lead to path1 on condition fulfilled', () => {
    expect(_wrapper.node.props.to).to.match(/path1/);
  });

  it('should lead to path1 on condition fulfilled', () => {
    props = { condition: false, children: 'test' };
    _wrapper = shallow(<Forked {...props}/>)
    expect(_wrapper.node.props.to).to.match(/path2/);
  });
});
