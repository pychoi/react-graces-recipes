import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

class SearchBar extends Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="search-bar">
        <form id="searchBar" method="GET" action="/results">
          <FormGroup>
            <InputGroup>
              <FormControl type="text" name="query" id="query" placeholder="Search Recipes"
                className="search-input form-control" />
              <InputGroup.Button>
                <Button type="submit" className="search-button"><i className="fa fa-search" aria-hidden="true"></i></Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default SearchBar;
