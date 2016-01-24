import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';

const reduxRouter = syncHistory(browserHistory);

export default reduxRouter;
