import { connect } from 'react-redux';
import { TIME_AWAIT } from '../constants';
import Home from '../components/Home';

const mapStateToProps = state => ({
  time: state.timeReducer.time
});

const mapDispatchToProps = dispatch => ({
  getTime: () => dispatch({ type: TIME_AWAIT })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
