import Rx from 'rx-lite';

const noop = () => {};

const getProgress$ = (request) => {
  const readystatechange$ = Rx.Observable.fromEvent(request, 'readystatechange');
  const progress$ = Rx.Observable.fromEvent(request, 'progress');
  const load$ = Rx.Observable.fromEvent(request, 'load');
  const abort$ = Rx.Observable.fromEvent(request, 'abort');
  const timeout$ = Rx.Observable.fromEvent(request, 'timeout');
  const error$ = Rx.Observable.fromEvent(request, 'error');

  return Rx.Observable.merge(
    readystatechange$,
    progress$,
    load$,
    abort$,
    timeout$,
    error$,
  );
};

const OriginalXHR = window.XMLHttpRequest; // before patching

// - you can specify a callback via either the global `pathXHR` method
//   or a `new XMLHttpRequest(callback)`.
// - the latter wins.
// - the callback will be invoked on every `new XMLHttpRequest()`
const patchXHR = (global, callback = noop) => {
  class MonkeyXHR {
    constructor(cb = callback) {
      const req = new OriginalXHR();
      const progress$ = getProgress$(req);
      req.progress$ = progress$;
      cb(req);
      // cb.forEach((fn) => {
      //   progress$.subscribe(fn); // @TODO middleware
      // });
      return req;
    }
  }

  if (global.XMLHttpRequest === OriginalXHR) { // haven't been patched
    global.XMLHttpRequest = MonkeyXHR; // only patch it once
  }
};

const unpatchXHR = (global) => {
  if (global.XMLHttpRequest !== OriginalXHR) {
    global.XMLHttpRequest = OriginalXHR;
  }
};

export default {
  patchXHR,
  unpatchXHR,
};
