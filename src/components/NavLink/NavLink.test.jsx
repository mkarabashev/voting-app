import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import NavLink from './NavLink';

describe('(components) NavLink', () => {
  let wrapper;

  const props = { to: 'path', children: 'test' };

  beforeEach(() => {
    wrapper = shallow(<NavLink {...props}/>);
  });

  it('should have a router Link component with props and a label description', () => {
    const component = wrapper.find(Link);
    expect(component).to.exist;
    expect(component.children().node).to.match(/test/);
    expect(component.node.props.to).to.match(/path/);
    expect(component.node.props.activeClassName).to.exist;
  });
});
