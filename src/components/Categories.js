import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

import * as ApiServices from '../services/ApiServices';
import Header from './Header';

class Categories extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      categories: [],
      error: false
    };

    this.getCategories = this.getCategories.bind(this);
    this.extractGroupData = this.extractGroupData.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
  }

  componentWillMount () {
    this.getCategories();
  }

  getCategories () {
    ApiServices.getCategories()
      .then(res => this.extractGroupData(res))
      .catch(err => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  extractGroupData (data) {
    const categories = data.reduce((obj, curr) => {
      if (obj[curr.group]) {
        obj[curr.group].push(curr.category);
      } else {
        obj[curr.group] = [curr.category];
      }
      return obj;
    }, {});

    this.setState({ categories: categories });
  }

  renderCategories (categories) {
    return  categories.map((category, index) => {
      return (
        <Col xs={6} sm={4} md={4} lg={3} key={index}>
          <li className="results-list-item">
            <Link to={{
              pathname: '/results',
              search: `?query=${category}`
            }} className="result-link">{category}</Link>
          </li>
        </Col>
      )
    });
  }

  render () {
    const categories = this.state.categories;
    const categoriesList = Object.keys(categories).map((key, index) => {
      return (
        <div className="category-group" key={index}>
          <h2 className="hdg-2">{key}</h2>
          <Row>
            <ul>
              {this.renderCategories(categories[key])}
            </ul>
          </Row>
        </div>
      )
    });

    return (
      <main>
        <Header authed={this.props.authed}/>
        { this.state.error && <Alert bsStyle="danger" className="text-center">Error retrieving categories!</Alert>}
        <Grid className="content-body">
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
              <h1 className="hdg-1">Search By Categories</h1>
              {categoriesList}
            </Col>
          </Row>
        </Grid>
      </main>
    );
  }
}

Categories.propTypes = {
  authed: PropTypes.bool
}

export default Categories;
