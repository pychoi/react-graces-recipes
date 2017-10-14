import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import firebase from 'firebase';

import '../styles/main.scss';

import history from '../history';
import Home from './Home';
import SearchResults from './SearchResults';
import Recipe from './Recipe';
import Categories from './Categories';
import Add from './Add';
import Edit from './Edit';
import Login from './Login';
import { config } from '../config/constants';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} authed={true} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        const pathname = props.location.state.from.pathname;
        const search = props.location.state.from.search;
        const result = props.location.state.from.state ? props.location.state.from.state.result : {};

        if (authed === false) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: pathname, search: search, state: { result: result } }} />
        }
      }
    }
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authed: false,
    }
    firebase.initializeApp(config);
  }

  componentDidMount () {
    this.removeListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log('user signed in ', JSON.stringify(user));
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount () {
    this.removeListener();
  }

  render () {
    return (
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/results" component={SearchResults} />
            <Route path="/recipe" component={Recipe} />
            <Route path="/categories" component={Categories} />
            <PublicRoute path="/login" component={Login} authed={this.state.authed} />
            <PrivateRoute path="/add" component={Add} authed={this.state.authed} />
            <PrivateRoute path="/edit" component={Edit} authed={this.state.authed} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
