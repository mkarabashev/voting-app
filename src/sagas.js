import { takeEvery } from 'redux-saga/effects';
import { homeSagas } from './Home';

// NOTE: setting up sagas with hmr requires them to be redeclared on rerender
export const loadSaga = ({ action, saga}) => takeEvery(action, saga);

export default () => [
  ...homeSagas
].map(loadSaga);
