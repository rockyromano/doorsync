/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import qs from 'qs';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import fetch from 'isomorphic-fetch';
import Link from '../Link';
import request from 'request';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.callHubspot();
    // access token: COjo1vaULBICAQEY2YcdILTSwAIolNQDMhkAng
    // refresh token: 4fe7e49c-7143-4421-af22-9bd4b6cb3eff
  }

  callHubspot() {
    axios
      .post(
        '/hubspotproxy/oauth/v1/token',
        qs.stringify({
          grant_type: 'authorization_code',
          client_secret: '6bf12e11-e5cb-45ee-a5ba-81534e6a0bef',
          redirect_uri: 'https://www.hubspot.com/',
          code: '07c84483-c970-4486-b6b1-ab6625c01485',
          client_id: 'c2011ac8-12fe-4d52-8cde-1283087babcf',
          scope: '',
        }),
      )
      .then(res => {});

    /* axios({
        method: 'POST',
        url: 'hubspotproxy/oauth/v1/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify({
          grant_type: 'authorization_code',
          client_secret: '6bf12e11-e5cb-45ee-a5ba-81534e6a0bef',
          redirect_uri: 'https://www.hubspot.com/',
          code: '70c55b33-683d-4e8f-a43a-4f67ae8d1cd4',
          client_id: 'c2011ac8-12fe-4d52-8cde-1283087babcf',
          scope: ''
        })
    }).then((res) => {
      console.log(`*****************`);
      debugger;
    }); */
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Feedback />
        <Footer />
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
