import React, { Component } from 'react';
import SelectableTable from './components/SelectableTable';

export default class ProductPage extends Component {
  static displayName = 'ProductPage';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="product-page-page">
        <SelectableTable />
      </div>
    );
  }
}
