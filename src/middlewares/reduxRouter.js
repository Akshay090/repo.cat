import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';

const reduxRouter = syncHistory(browserHistory);

export default reduxRouter;
