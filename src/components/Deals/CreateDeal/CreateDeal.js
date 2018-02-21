/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import update from 'immutability-helper';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as actionTypes from '../../../actions/actionTypes';
import * as dealActions from '../../../actions/dealActions';
import s from './CreateDeal.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import contactsApi from '../../../api/mockContactsApi';
import {Typeahead} from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CreateDeal extends React.Component {

  state = { 
    contacts: [],
    form: {
      associations: {
        associatedVids: [],
        associatedCompanyIds: [],
        associatedDealIds: []
      }
    }
  }

  constructor(props, context) {
    super(props, context);
    this.selectCompanyChange = this.selectCompanyChange.bind(this);
  }

  componentDidMount() {
    const props = this.props;
    this.searchContacts('test');
  }

  searchContacts(query) {
    contactsApi.search(query).then((res) => {
      this.setState({ contacts: res.contacts });
    });
  }

  contactsRow(contact) {
    return <div key={contact.vid}>{ contact.vid }</div>;
  }

  selectCompanyChange(company) {
    console.log('state: ', this.state);
    let vid = company[0].vid;
    debugger;
    this.setState(update(this.state, {
      form: { 
        associations: { 
          associatedCompanyIds: { 
            $push: [company[0].vid]
          } 
        } 
      }
    }));
  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col-4">Col</div>
          <div className="col-4">Col</div>
          <div className="col-4">Col</div>
        </div>
        <Form>
          { 
            this.state.contacts.length && 
            <FormGroup>
              <Label for="contacts">Contacts</Label>
              <Typeahead
                onChange={this.selectCompanyChange}
                options={this.state.contacts}
                labelKey={ (option) => { return option.properties.company.value } }
              />
            </FormGroup>
          }
        </Form>

        <p>{this.state.form.associations.associatedCompanyIds[0]}</p>
        <div>
        
        </div>
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
  withStyles(s)(CreateDeal),
);
