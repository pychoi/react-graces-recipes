import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import RecipeForm from './RecipeForm';

class Add extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Header authed={this.props.authed}/>
        <RecipeForm edit={false} />
      </div>
    );
  }
}

Add.propTypes = {
  authed: PropTypes.bool
}

export default Add;
