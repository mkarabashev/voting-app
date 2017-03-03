import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => ({
  auth: state.userReducer.authenticated
});

export default connect(mapStateToProps)(Header);
