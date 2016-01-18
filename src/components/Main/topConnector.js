// https://github.com/rackt/react-redux/blob/master/docs/api.md
import { connect } from 'react-redux';
import * as actions from '../../actions';

const mapStateToProps = (storeState, ownProps) => {
  return storeState;
};

const mapDispatchToProps = actions; // just bind them all for now

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
