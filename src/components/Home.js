import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

import history from '../history';
import SearchBar from './SearchBar';

class Home extends Component {
    constructor () {
        super();
    }

    render () {
        return (
            <Grid className="home-container">
                <h1 className="hdg-1 logo logo-lg">Grace's Recipes</h1>
                <Row>
                    <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
                        <SearchBar />
                        <Link to="/categories" className="home-link">Search By Categories</Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Home;
