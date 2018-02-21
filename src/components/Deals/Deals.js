/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as actionTypes from '../../actions/actionTypes';
import * as dealActions from '../../actions/dealActions';
import s from './Deals.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dealsApi from '../../api/mockDealsApi';
import CreateDeal from './CreateDeal/CreateDeal';

class Deals extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const props = this.props;
    this.props.actions.loadAllDeals();
  }

  dealRow(deal, index) {
    return <div key={deal.dealId}>{deal.properties.dealname.value}</div>;
  }

  render() {
    return (
      <div className={s.root}>
        <CreateDeal></CreateDeal>
        { this.props.deals.length && <div className={s.container}>{this.props.deals.map(this.dealRow)}</div> }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    deals: state.deals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dealActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(s)(Deals),
);
