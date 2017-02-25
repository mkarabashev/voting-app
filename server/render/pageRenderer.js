import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import htmlRenderer from './htmlRenderer';
import reactRenderer from './reactRenderer';
import { actions } from '../../src/Login';

const pageRenderer = (props, store, user) => {
  // if authenticated preload the user data to the store
  if (user && user._id) {
    store.dispatch(actions.authenticated(user.username, user.polls));
  }

  // sanitize the store data
  const preloadedState = serialize(store.getState());

  // render
  const reactString = reactRenderer(store, props);
  const head = Helmet.rewind();
  return htmlRenderer(preloadedState, reactString, head);
};

export default pageRenderer;
