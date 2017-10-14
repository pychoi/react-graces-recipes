import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';
import { Grid, Row, Col } from 'react-bootstrap';

import getQueryString from '../utils/helpers';
import * as ApiServices from '../services/ApiServices';
import Header from './Header';

class Recipe extends Component {
  constructor (props) {
    super(props);
    this.state = {
      recipe: {
        _id: '',
        name: '',
        source: '',
        ingredients: '',
        instructions: '',
        categories: []
      }
    };
  }

  componentWillMount () {
    if (this.props.history.location.state) {
      const resultProps = this.props.history.location.state.result;
      this.setState({ recipe: resultProps });
    } else {
      ApiServices.getRecipeById(getQueryString('id')).then(data => {
        this.setState({ recipe: data });
      });
    }
  }

  render () {

    const categories = this.state.recipe.categories.map((category, index) => {
      return (
        <label className="category-tag" key={index}>
          <Link to={{
            pathname: '/results',
            search: `?query=${category}`
          }}>
            <i className="fa fa-tag" aria-hidden="true"></i> { category }
          </Link>
        </label>
      );
    });

    return (
      <main>
        <Header />
        <Grid className="content-body">
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
              <Link to={{
                pathname: '/edit',
                search: `?id=${this.state.recipe._id}`,
                state: { result: this.state.recipe }
              }}><i className="fa fa-pencil" aria-hidden="true"></i> Edit Recipe</Link>
              <h1 className="recipe-title">{this.state.recipe.name}</h1>
              <p className="source">Source:<br/><a href={this.state.recipe.source} target="_blank">{this.state.recipe.source}</a></p>
              <div className="tags-container">
                <p className="categories">Categories:</p>
                { categories }
              </div>
              <div className="ingredients">
                <h2 className="recipe-sectionTitle">Ingredients</h2>
                {Parser(this.state.recipe.ingredients)}
              </div>
              <div className="instructions">
                <h2 className="recipe-sectionTitle">Instructions</h2>
                {Parser(this.state.recipe.instructions)}
              </div>
            </Col>
          </Row>
        </Grid>
      </main>
    );
  }

}

export default Recipe;
