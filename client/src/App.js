import React from 'react';
import './App.css';
import store from './store'
import jwt_decode from 'jwt-decode'

import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/all-profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthneticated
  store.dispatch(setCurrentUser(decoded))
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:handle" component={Profile} />
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/create-profile" component={CreateProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/edit-profile" component={EditProfile} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-experience" component={AddExperience} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add-education" component={AddEducation} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/feed" component={Posts} />
                </Switch>
                <Route exact path="/not-found" component={NotFound} />
              </div>
            <Footer />
          </header>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
