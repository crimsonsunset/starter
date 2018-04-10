import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Routes from 'config/routes';

import styles from '../styles/index.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.displayName = "App";
  }

  // static propTypes = {};

  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">

            <li><Link to="/">Home</Link></li>
            <li><Link to="/playground">Playground</Link></li>
            <li><Link to="/not-found">Not Found</Link></li>

          </ul>
        </nav>

        {/*todo: protected routes and redirects */}
        {/*https://www.sitepoint.com/react-router-v4-complete-guide/*/}
        <Routes/>

      </div>

    )
  }
}

export default App