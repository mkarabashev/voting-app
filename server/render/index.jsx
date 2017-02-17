import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import { createStore } from 'redux';

import htmlRenderer from './htmlRenderer';
import reactRenderer from './reactRenderer';
import rootReducer from '../../src/rootReducer';

const pageRenderer = props => {
  const store = createStore(rootReducer);
  const preloadedState = serialize(store.getState());
  const reactString = reactRenderer(store, props);
  const head = Helmet.rewind();

  return htmlRenderer(head, reactString, preloadedState);
};

export default pageRenderer;
