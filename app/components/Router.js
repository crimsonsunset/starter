import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom';
import App from 'components/App';
import HomeView from "./views/HomeView";

class Router extends Component {
  constructor(props) {
    super(props);
    this.displayName = "HomeView";
  }

  render() {
    return (
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    )
  }
}

export default Router;
