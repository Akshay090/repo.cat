// import React from 'react';
// import ReactDOM from 'react-dom';
// import TestUtils from 'react-addons-test-utils';
// import { patchDOMEnv } from './__setup__/domEnv';
// import expect from 'expect';
//
// import App from '../src/App';
//
// patchDOMEnv();
//
// describe('App', () => {
//   it('content should be foobar', () => {
//     const app = TestUtils.renderIntoDocument(<App/>);
//     const appNode = ReactDOM.findDOMNode(app);
//
//     expect(appNode.textContent).toEqual('foobar');
//   });
//
//   it('className should start with blue, then red after click', () => {
//     const app = TestUtils.renderIntoDocument(<App/>);
//     const appNode = ReactDOM.findDOMNode(app);
//
//     expect(appNode.className).toEqual('blue');
//
//     TestUtils.Simulate.click(appNode);
//
//     expect(appNode.className).toEqual('red');
//   });
// });
