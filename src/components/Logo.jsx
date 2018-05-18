import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Img from '@icedesign/img';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={{}}>
        <Link to="/" className="logo-text">
          <Img
            width={160}
            height={40}
            src={require('../../public/images/logo2.png')}
          />
        </Link>
      </div>
    );
  }
}
