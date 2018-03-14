import React, {Component} from 'react'
import PropTypes from 'prop-types';
// import routes from '../config/routes'
// import {map} from 'lodash'

class NotFoundView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
    console.log(this);
  }

  render(){
    return <h2>NotFoundView</h2>
  }
}

export default NotFoundView