import axios from 'axios';
import {buildURL} from "app/helpers";
import {drop} from 'lodash';
//todo: add this if needed
// require('promise.prototype.finally').shim();

export function fetchResults() {
}

export function searchItemSelected(item) {

	return (dispatch, getState) => {

	  //todo: wire up diff endpoint
    return axios.post(buildURL(),{id} )
			.then((response) => {
        dispatch(actions.searchSelected(item));
			})
			.catch((error) => {
        console.debug('errorz')
        console.debug(error)
			})
	}
}

// export function resetState() {
// 	return (dispatch, getState) => {
// 		return dispatch(actions.resetState());
// 	}
// }

const actions = {
  searchSelected: (player) => {
		return {
			type: 'SEARCH_SELECTED',
      player
		}
	},
};

const initialState = {
  joe: 'cool'
};

export default function SearchState(state = initialState, action = {type:'SEARCH_INIT'}) {

	function _populateSearch() {
	  //build state here
	}

	switch (action.type) {
		case 'SEARCH_SELECTED' :
			return _populateSearch();
		default:
			return state;
	}

  return state;

}
