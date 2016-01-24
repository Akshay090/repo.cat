/* eslint-disable arrow-body-style */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions';
import { dataTypes } from '../../constants';

const mapStateToProps = (storeState) => {
  // states from the single store tree
  return storeState;
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
    filterSwitch,
    setFilterStatus,
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
    filterSwitch: filterSwitch(dispatch),
    setFilterStatus: setFilterStatus(dispatch),
  } : stateProps;
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
