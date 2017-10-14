import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import { logout } from '../utils/auth';
import SearchBar from './SearchBar';

class Header extends Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <header className="header">
        <Grid>
          <Row>
            <Col lg={2} md={2} sm={3} xs={12} className="header-links">
              <Link to="/" className="header-logo logo logo-sm">Grace's Recipes</Link>
            </Col>
            <Col lg={6} md={6} sm={5} xs={12} className="header-links">
              <Link to="/categories" className="header-nav-item">Categories</Link>
              <Link to="/add" className="header-nav-item">Add Recipe</Link>
              { this.props.authed && <a href="javascript:void(0)" onClick={logout}>Logout</a> }
            </Col>
            <Col lg={4} md={4} sm={4} xs={12} className="text-right">
              <SearchBar />
            </Col>
          </Row>
        </Grid>
      </header>
    );
  }
}

Header.propTypes = {
  authed: PropTypes.bool
}

export default Header;
