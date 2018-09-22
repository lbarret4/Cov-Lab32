import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Chirp } from './Data';
import { ChirpEdit, ChirpsFeed as Home } from './View';
import Header from './Header';

const Navigation = () => {


  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chirps/:id/edit" component={ChirpEdit} />
          <Route path="/chirps/:id" component={Chirp} />

        </Switch>

      </div>

    </Router>


  );
}


export default Navigation;
