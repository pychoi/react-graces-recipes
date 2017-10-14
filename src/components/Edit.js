import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getQueryString from '../utils/helpers';

import Header from './Header';
import RecipeForm from './RecipeForm';

class Edit extends Component {
  constructor (props) {
    super(props);
    this.state = this.props.history.location.state.result;
  }

  render () {
    return (
      <div>
        <Header authed={this.props.authed}/>
        <RecipeForm edit={true} result={this.state} />
      </div>
    );
  }
}

export default Edit;
