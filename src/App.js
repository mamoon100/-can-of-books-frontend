import React from "react";
import Header from "./Header";
import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import BestBooks from "./BestBooks";
import Profile from "./Profile";

class App extends React.Component {
  render() {
    console.log("app", this.props);
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <Header />
            <Switch>
              <Route exact path="/">
                {this.props.auth0.isAuthenticated ? <BestBooks /> : <Login />}
                {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              </Route>
              <Route exact path="/profile">
                {this.props.auth0.isAuthenticated && (
                  <Profile
                    name={this.props.auth0.user.name}
                    src={this.props.auth0.user.picture}
                    email={this.props.auth0.user.email}
                  />
                )}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
