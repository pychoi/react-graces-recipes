import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert} from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import * as ApiServices from '../services/ApiServices';

const ingredientsModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{'list': 'bullet'}]
  ]
};

const instructionsModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{'list': 'ordered'}]
  ]
};

const formats = [
  'bold', 'italic', 'underline', 'list', 'bullet'
];

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: '',
        source: '',
        ingredients: '',
        instructions: '',
        categories: []
      },
      presetCat: [],
      redirect: false,
      savingError: false,
      getCatError: false
    };
    this.recipe = {};
    this.categories = [];
    this.bindFunctions();
  }

  bindFunctions () {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handleInstructionsChange = this.handleInstructionsChange.bind(this);
    this.handleCatChange = this.handleCatChange.bind(this);
    this.getCategories = this.getCategories.bind(this);
  }

  componentWillMount () {
    this.getCategories();
    if (this.props.edit) {
      this.setState({ recipe: this.props.result });
    }
  }

  getCategories () {
    ApiServices.getCategories().then(data => {
      this.setState({ presetCat: data });
    }).catch(err => {
      console.log(err);
      this.setState({ getCatError: true });
    });
  } 

  handleSubmit (e) {
    e.preventDefault();
    if (this.props.edit) {
      ApiServices.editRecipe(this.state.recipe).then(data => {
        this.recipe = this.state.recipe;
        this.setState({ redirect: true });
      }).catch(err => {
        console.log(err);
        this.setState({ savingError: true });
      });
    } else {
      ApiServices.addRecipe(this.state.recipe).then(data => {
        this.recipe = data;
        this.setState({ redirect: true });
      }).catch(err => {
        console.log(err);
        this.setState({ savingError: true });
      });
    }
  }

  handleNameChange (e) {
    this.setState({ recipe: { ...this.state.recipe, name: e.target.value } });
  }

  handleSourceChange (e) {
    this.setState({ recipe: { ...this.state.recipe, source: e.target.value } });
  }

  handleIngredientsChange (value) {
    this.setState({ recipe: { ...this.state.recipe, ingredients: value } });
  }

  handleInstructionsChange (value) {
    this.setState({ recipe: { ...this.state.recipe, instructions: value } });
  }

  handleCatChange (e) {
    let catArr = this.state.recipe.categories;

    if (e.target.value === 'on' && catArr.indexOf(e.target.dataset.cat) === -1){
      catArr.push(e.target.dataset.cat);
    } else {
      catArr.splice(catArr.indexOf(e.target.dataset.cat), 1);
    }

    this.setState({ recipe: { ...this.state.recipe, categories: catArr } });
  }

  render () {

    if (this.state.redirect) {
      return (
        <Redirect to={{
            pathname: '/recipe',
            search: `id=${this.recipe._id}`,
            state: { result: this.recipe }
        }}/>
      )
    }

    const categoryCheckboxes = this.state.presetCat.map((category) => {
      return <Col xs={6} sm={4} md={4} lg={3} key={category._id}>
              <Checkbox
                data-cat={category.category}
                name="categories"
                className="category-checkbox"
                checked={this.state.recipe.categories.includes(category.category)}
                onChange={this.handleCatChange}>{category.category}
              </Checkbox>
            </Col>
    });

    return (
      <main>
        { this.state.savingError && <Alert bsStyle="danger" className="text-center">Error Saving Recipe!</Alert> }
        { this.state.getCatError && <Alert bsStyle="danger" className="text-center">Error Retrieving Categories!</Alert> }
        <Grid className="content-body">
          <Row>
            <Col xs={12} sm={10} smOffset={1} md={8} mdOffset={2}>
              <h1 className="hdg-1">Add/Edit Recipe</h1>
              <form className="recipe-form" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel className="recipe-form-label">Recipe Name</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="Recipe Name"
                    name="name"
                    value={this.state.recipe.name}
                    onChange={this.handleNameChange} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel className="recipe-form-label">Source</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="http://www.example.com"
                    name="source"
                    value={this.state.recipe.source}
                    onChange={this.handleSourceChange} />
                </FormGroup>
                <FormGroup>
                  <ControlLabel className="recipe-form-label">Ingredients</ControlLabel>
                  <ReactQuill
                    theme="snow"
                    modules={ingredientsModules}
                    formats={formats}
                    placeholder="Enter ingredients as a bullet list"
                    value={this.state.recipe.ingredients}
                    onChange={this.handleIngredientsChange}
                    name="ingredients" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel className="recipe-form-label">Instructions</ControlLabel>
                  <ReactQuill
                    theme="snow"
                    modules={instructionsModules}
                    formats={formats}
                    placeholder="Enter instructions as a numbered list"
                    name="instructions"
                    value={this.state.recipe.instructions}
                    onChange={this.handleInstructionsChange}/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel className="recipe-form-label">Categories</ControlLabel>
                  <Row>
                  {categoryCheckboxes}
                  </Row>
                </FormGroup>
                <FormGroup>
                  <input className="submit-button" type="submit" value="Submit" />
                </FormGroup>
              </form>
            </Col>
          </Row>
        </Grid>
      </main>
    );
  }
}

RecipeForm.propTypes = {
  edit: PropTypes.bool.isRequired,
  recipeId: PropTypes.string
}

export default RecipeForm;
