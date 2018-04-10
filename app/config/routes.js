import React from 'react'
import * as Views from 'components/views/'
import {Route, Redirect, Switch} from 'react-router-dom';
import {map} from 'lodash'
import {pascalCase} from "../helpers";

const routeConfig = {
  "not-found": {
    component: Views.NotFoundView
  },
  "playground": {
    component: Views.PlaygroundView,
    config:{
      name: 'Checkem out',
      endpoint: '/test/endpoint',
      titleText: 'Playground',
      // onMount: function(){
      //   console.log('hey mount', this)
      // }
    }
  },
  // "indexRoute": "comicpromo_create"
};

let otherRoutes = map(routeConfig, (e, i) => {
  return (
    <Route
      key={i}
      path={`/${i}`}
      config={e.config}
      component={Views[`${pascalCase(i)}View`]}/>
  )
});

let Routes;
export default Routes = () => (
  <Switch>
    <Route exact={true} path="/" component={Views.HomeView}/>
    {otherRoutes}
  </Switch>
);