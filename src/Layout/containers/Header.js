import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => ({
  auth: state.userReducer.authenticated,
  screenWidth: state.windowSizeReducer
});

export default connect(mapStateToProps)(Header);
