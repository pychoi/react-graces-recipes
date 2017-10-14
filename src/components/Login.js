import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, Checkbox, Button, Alert} from 'react-bootstrap';

import { login } from '../utils/auth';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      error: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (e) {
    e.preventDefault();
    login(this.email.value, this.pw.value)
      .catch(error => {
        this.setState({ error: true });
        console.log(error);
      }).then(() => {
        this.email.value = '';
        this.pw.value = '';
      })
  }

  render () {
    return (
      <div>
        { this.state.error && <Alert bsStyle="danger" className="text-center">Login Failed!</Alert>}
        <Grid className="login">
          <h1 className="text-center logo logo-lg">
            <Link to="/">Grace's Recipes</Link>
          </h1>
          <h2 className="login-title hdg-1">Login</h2>
          { this.state.errorMessage && <p>{this.state.errorMessage}</p> }
          <form id="loginForm" className="login-form" onSubmit={this.handleSubmit}>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                ref={(email) => this.email = email} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="pw"
                ref={(pw => this.pw = pw)} />
            </FormGroup>
            <FormGroup>
              <input className="submit-button" type="submit" value="Login" />
            </FormGroup>
          </form>
        </Grid>
      </div>
    );
  }
}

export default Login;
