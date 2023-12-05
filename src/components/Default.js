import React, { Component } from "react";

export default class Default extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase py-5">
            <h1 className="display-3">404</h1>
            <h2>error</h2>
            <h3>page not found</h3>
            <h3>
              the requested URL{" "}
              <span className="text-danger">{window.location.pathname}</span>
              was not found
            </h3>
          </div>
        </div>
      </div>
    );
  }
}
