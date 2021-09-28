import React from "react";
import ListPage from "./components/ListPage.js";
import DetailsPage from "./components/DetailsPage.js";
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default class ParamsExample extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavLink 
          activeClassName='active-link' 
          exact 
          to="/">
            ListPage
          </NavLink>
          <Switch>
            <Route 
              path="/" 
              exact
              render={(routerProps) => <ListPage {...routerProps} />} 
            />          
            <Route 
              path="/teas/:id" 
              exact
              render={(routerProps) => <DetailsPage {...routerProps} />} 
            />          
          </Switch>
        </div>
      </Router>
    );
  }
}