import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import htmlRenderer from './htmlRenderer';
import reactRenderer from './reactRenderer';
import { actions } from '../../src/Auth';

const pageRenderer = (props, store, user) => {
  let html;

  // if authenticated preload the user data to the store
  if (user && user._id) {
    store.dispatch(actions.authenticated(user.username, user.polls));
  }

  // sanitize the store data
  const preloadedState = serialize(store.getState());

  if (process.env.NODE_ENV === 'production') {
    // server render in production
    const reactString = reactRenderer(store, props);
    const head = Helmet.rewind();
    html = htmlRenderer(preloadedState, reactString, head);
  } else {
    // client rendering in dev
    html = htmlRenderer(preloadedState);
  }

  return html;
};

export default pageRenderer;
