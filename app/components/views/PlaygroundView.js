import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
          <Button bsStyle="success">Success</Button>
        </div>
      </section>
        )
  }
}

export default PlaygroundView