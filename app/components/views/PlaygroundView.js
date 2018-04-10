import React, {Component} from 'react'
import PropTypes from 'prop-types';
// import { Button } from 'bulma';
// import routes from '../config/routes'
// import {map} from 'lodash'

class PlaygroundView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
    // console.log(this);
    // console.log(Button)
  }

  render(){
    return (
      <section>
      <h2>PlaygroundView</h2>
        <div>
          <a className="button is-primary">Primary</a>
        </div>
      </section>
        )
  }
}

export default PlaygroundView