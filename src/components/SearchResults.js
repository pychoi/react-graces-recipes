import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

import getQueryString from '../utils/helpers';

import Header from './Header';
import * as ApiServices from '../services/ApiServices';

class SearchResults extends Component {
  constructor () {
    super();
    this.state = {
      results: [],
      query: '',
      loading: false,
      error: false
    };

    this.getSearchTerm = this.getSearchTerm.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  componentWillMount () {
    const searchTerm = this.getSearchTerm();
    this.setState({ loading: true });
    this.setState({ query: searchTerm });
    this.getSearchResults(searchTerm).then(() => this.setState({ loading: false }));
  }

  getSearchResults (searchTerm) {
    return ApiServices.searchRecipes(searchTerm)
      .then(res => this.setState({ results: res }))
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  getSearchTerm () {
    return getQueryString('query');
  }

  render () {
    if (!this.state.loading) {
      const results = this.state.results.map(result => {
        return (
          <li className="results-list-item" key={result._id}>
            <Link to={{
              pathname: '/recipe',
              search: `?id=${result._id}`,
              state: { result: result }
            }} className="result-link">{result.name}</Link>
          </li>
        )
      });

      const numOfResults = this.state.results.length;
      const query = decodeURIComponent(this.state.query).replace(/\+/g, ' ');

      return (
        <main>
          <Header />
          { this.state.error && <Alert bsStyle="danger" className="text-center">Error searching recipes!</Alert> }
          <Grid className="content-body">
            <Row>
              <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
                <h1 className="hdg-1">
                  { numOfResults } {numOfResults > 1 ? 'Results' : 'Result'} for "{ query }"</h1>
                <ul>{results}</ul>
              </Col>
            </Row>
          </Grid>
        </main>
      );

    } else {
        return (<p>&nbsp;</p>);
    }
  }
}

export default SearchResults;
