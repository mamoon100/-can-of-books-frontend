import React, { Component } from "react";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <img src={this.props.src} alt="profile " />
        <p>{this.props.name}</p>
        <p>{this.props.email}</p>
      </div>
    );
  }
}
