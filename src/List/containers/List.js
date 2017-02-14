import { connect } from 'react-redux';
import List from '../components/List';
import { addString } from '../actions';

const mapStateToProps = state => ({
  list: state.listReducer
});

const mapDispatchToProps = dispatch => ({
  addString: (e, input) => {
    e.preventDefault();

    const str = input && input.value
      ? input.value.trim()
      : null;
    input.value = '';

    if (str) dispatch(addString(str));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
