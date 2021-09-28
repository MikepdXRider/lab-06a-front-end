import React from "react";
import ListPage from "./components/ListPage.js";
import DetailsPage from "./components/DetailsPage.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default class ParamsExample extends Component {
  render() {
    return (
      <Router>
        <div>
          <h2>Header</h2>
          <Switch>
            <Route 
              path="/" 
              exact
              render={(routerProps) => <ListPage {...routerProps} />} 
            />          
            <Route 
              path="/:id" 
              exact
              render={(routerProps) => <DetailsPage {...routerProps} />} 
            />          
          </Switch>
        </div>
      </Router>
    );
  }
}