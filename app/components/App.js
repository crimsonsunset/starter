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
      <div className={'app'}>

        <nav class="navbar is-dark">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"
                   width="112" height="28"/>
            </a>
          </div>

          <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" href="https://bulma.io/">
                Home
              </a>

            </div>

            {/*<div class="navbar-end">*/}
              {/*<div class="navbar-item">*/}
                {/*<div class="field is-grouped">*/}
                  {/*<p class="control">*/}
                    {/*<a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet"*/}
                       {/*data-social-target="http://localhost:4000" target="_blank"*/}
                       {/*href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&amp;hashtags=bulmaio&amp;url=http://localhost:4000&amp;via=jgthms">*/}
                      {/*<span>*/}
                {/*Tweet*/}
              {/*</span>*/}
                    {/*</a>*/}
                  {/*</p>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</div>*/}

          </div>
        </nav>

        <Routes/>

        <footer class="footer">
          <div class="container">
            <div class="content has-text-centered">
              <p>
                <strong>Bulzzma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
              </p>
            </div>
          </div>
        </footer>

      </div>

    )
  }
}

export default App