import React from 'react';
import { shallow } from 'enzyme';
import fork from './fork';

describe('(HOComponents) fork', () => {
  const validateComponent = (wrapper, component) =>
    expect(component)
      .to.exist.with.property('node')
      .that.is.an('object')
      .with.deep.property('props.children', 'test');

  // create a fork
  const Component1 = (props) => (<FakeComponent1 {...props}/>);
  const Component2 = (props) => (<FakeComponent2 {...props}/>);

  const single = fork(Component1);
  const forked = fork(Component1, Component2);

  // add forked props
  const fulfilled = { prop: 'fulfilled' };
  const unfulfilled = { prop: 'unfulfilled' };

  const SingleNoProps = single();
  const SingleWithFulfilled = single(fulfilled);
  const SingleWithProps = single(fulfilled, unfulfilled);
  const ForkedWithProps = forked(fulfilled, unfulfilled);

  // props to be passed to the final component
  const propsTrue = { condition: true, children: 'test' }
  const propsFalse = { condition: false, children: 'test' }

  it('should produce an unforked component when given def arguments', () => {
    const wrapper = shallow(<SingleNoProps {...propsTrue}/>);
    expect(wrapper.nodes).to.have.length(1);
    validateComponent(wrapper, wrapper.find(Component1));
  });

  it('should produce an unforked component with fulfilled props', () => {
    const wrapper = shallow(<SingleWithFulfilled {...propsTrue}/>);
    expect(wrapper.nodes).to.have.length(1);

    const foundComponent = wrapper.find(Component1);
    validateComponent(wrapper, foundComponent);
    expect(foundComponent.node.props)
      .to.have.property('prop', 'fulfilled');
  });

  it('should produce an prop fork with one component', () => {
    const wrapper = shallow(<SingleWithProps {...propsTrue}/>);
    expect(wrapper.nodes).to.have.length(1);
    validateComponent(wrapper, wrapper.find(Component1));
  });

  it('should have prop fork lead to fulfilled when condition is met', () => {
    const wrapper = shallow(<SingleWithProps {...propsTrue}/>);
    const foundComponent = wrapper.find(Component1);

    expect(foundComponent.node.props)
      .to.have.property('prop', 'fulfilled');
  });

  it('should have prop fork lead to unfulfilled when condition is not met', () => {
    const wrapper = shallow(<SingleWithProps {...propsFalse}/>);
    const foundComponent = wrapper.find(Component1);

    expect(foundComponent.node.props)
      .to.have.property('prop', 'unfulfilled');
  });

  it('should produce a component fork that leads to Component1 when condition is met ', () => {
    const wrapper = shallow(<ForkedWithProps {...propsTrue}/>);
    expect(wrapper.nodes).to.have.length(1);
    validateComponent(wrapper, wrapper.find(Component1));
  });

  it('should produce a component fork that leads to Component2 when condition is not met ', () => {
    const wrapper = shallow(<ForkedWithProps {...propsFalse}/>);
    expect(wrapper.nodes).to.have.length(1);
    validateComponent(wrapper, wrapper.find(Component2));
  });
});
