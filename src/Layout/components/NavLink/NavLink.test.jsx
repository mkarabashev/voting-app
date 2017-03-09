import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import NavLink from './NavLink';
import styles from './styles';

describe('(components) NavLink', () => {
  let wrapper;

  const props = { to: 'path', children: 'test' };

  beforeEach(() => {
    wrapper = shallow(<NavLink {...props}/>);
  });

  it('should have a router Link component with props and a label description', () => {
    expect(wrapper.contains(
      <Link {...props} activeClassName={styles.active}/>
    )).to.be.true;
  });
});
