// import React, {Component} from 'react'
// import PropTypes from 'prop-types';
// import {a} from 'react-router-dom';
// import Routes from 'config/routes';
// import {React} from 'app/helpers';
import $ from 'jquery';


class App {
  constructor() {
    this.displayName = "App";
  }

  template() {
    return $(`<div>
        <nav className="navbar">
          <ul className="nav navbar-nav">

            <li><a href="/">Home</a></li>
            <li><a href="/playground">Playground</a></li>
            <li><a href="/not-found">Not Found</a></li>
            ${'joe was here'}
          </ul>
        </nav>
      </div>`
    );
  }
}

export default App

//todo: https://davidwalsh.name/convert-html-stings-dom-nodes
//ContextualFragment