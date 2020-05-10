import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddCours from './components/add-cours.component';
import Cours from './components/cours.component';
import ListCours from './components/list-cours.component';


class App extends Component{
  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/cours" className="navbar-brand">
            P3
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/cours"} className="nav-link">
                Liste cours
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Nouveau cours
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/cours"]} component={ListCours} />
            <Route exact path="/add" component={AddCours} />
            <Route path="/cours/:id" component={Cours} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}


export default App;
