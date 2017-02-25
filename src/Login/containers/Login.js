import { connect } from 'react-redux';
import { authenticated } from '../actions';
import Login from '../components/Login';

const mapDispatchToProps = dispatch => ({
  auth: () => dispatch(authenticated())
});

export default connect(null, mapDispatchToProps)(Login);
