import jsdom from 'jsdom';

export const patchDOMEnv = () => {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
};

export const unpatchDOMEnv = () => {
  global.document = null;
  global.window = null;
};
