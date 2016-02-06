import createWorkerMiddleware from 'redux-worker-middleware';

const GFMParserWorker = require('worker!../workers/GFMParserWorker');
const parserWorker = new GFMParserWorker;

const workerMiddleware = createWorkerMiddleware(parserWorker);

export default workerMiddleware;
