import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Footer />
        </header>
      </div>
    </Router>
  );
}

export default App;
