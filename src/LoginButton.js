import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";

class LoginButton extends Component {
  render() {
    return (
      <button onClick={() => this.props.auth0.loginWithRedirect()}>
        Log In
      </button>
    );
  }
}

export default withAuth0(LoginButton);
