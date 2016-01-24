import { Component } from 'react';
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin';

export default class PureComponent extends Component {
  constructor(...args) {
    super(...args);
    this.shouldComponentUpdate = shouldComponentUpdate.bind(this);
  }
}
