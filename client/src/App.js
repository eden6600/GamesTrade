import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';

import PrivateRoute from './components/common/PrivateRoute';
import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import AddGame from './components/add-game/AddGame';
import GameDetails from './components/game-details/GameDetails';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import AllGames from './components/all-games/AllGames';
import MessageLayout from './components/message/MessageLayout';
import Footer from './components/layout/Footer';

import './App.css';
import CreateProfile from './components/create-profile/CreateProfile';

// Check For Token
if (localStorage.getItem('jwtToken')) {
  // Set auth header auth
  setAuthToken(localStorage.getItem('jwtToken'));
  // Decode token and get user info
  const decoded = jwt_decode(localStorage.getItem('jwtToken'));
  // Set user and isAuth
  store.dispatch(setCurrentUser(decoded));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/dashboard/add-game"
                component={AddGame}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/game/:id" component={GameDetails} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/profile/:id" component={Profile} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/all-games/:platform/:id"
                component={AllGames}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/message/:id"
                component={MessageLayout}
              />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
