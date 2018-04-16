import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import createHistory from 'history/createBrowserHistory'
import {routerReducer as router, routerMiddleware} from 'react-router-redux'
import * as reducers from 'app_redux/modules'
import routes from 'config/routes'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
    router
  }),
  composeEnhancers(
    // applyMiddleware(routerMiddleware(browserHistory)),
    applyMiddleware(thunk.withExtraArgument(routes)),
    applyMiddleware(middleware)
  ));

if (module.hot) {
  // console.log('hot potato coming thru');
  module.hot.accept('./modules/index', () => {
    const nextRootReducer = require('./modules/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;


// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))