import React from 'react';
import './App.css';
import store from './store'

import {BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

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
          </div>
          <Footer />
        </header>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
