import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Chirp } from './Data';
import { ChirpEdit as Edit, ChirpsFeed as Home, ChirpMentions as Mentions } from './View';
import Header from './Header';

const Navigation = () => {


  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chirps/:id/edit" component={Edit} />
          <Route exact path="/chirps/:id" component={Chirp} />
          <Route path="/chirps/:user/:id" component={Mentions} />

        </Switch>

      </div>

    </Router>


  );
}


export default Navigation;
