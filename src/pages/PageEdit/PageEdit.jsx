import React, { Component } from 'react';
import SettingsForm from './components/SettingsForm';

export default class PageEdit extends Component {
  static displayName = 'PageEdit';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-edit-page">
        <SettingsForm />
      </div>
    );
  }
}
