import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom';
import { hot } from 'react-hot-loader'
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

// export default Router;
export default hot(module)(Router)
