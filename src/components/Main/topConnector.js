/* eslint-disable arrow-body-style */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { dataTypes } from '../../constants';

const mapStateToProps = (storeState, ownProps) => {
  // states from the single store tree
  return {
    ...storeState,
    routing: ownProps,
  };
};

const mapDispatchToProps = (dispatch) => {
  // let `mergeProps` bind actionCreators
  return {
    dispatch,
    ...actions,
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const {
    dispatch,
    loadAllForType,
  } = dispatchProps;

  const { pathname } = stateProps.routing.location;
  const type = pathname.substring(1);

  const fetchData = dataTypes.includes(type) ?
    bindActionCreators(loadAllForType(type), dispatch) :
    false;

  return fetchData ? {
    type,
    dispatch,
    ...stateProps,
    fetchData,
  } : stateProps;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
