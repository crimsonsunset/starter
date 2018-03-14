// import React from 'react';
// import ReactDOM from 'react-dom';
// import 'styles/index.scss';
import App from 'components/App';
import {React} from 'app/helpers';
// const React = fakeReact();

// ReactDOM.render(
//   <Router/>,
//   document.getElementById('app'));


// console.log('in main', App);
// console.log('in main', new App());
//
//
// document.getElementById('app').appendChild();

let app = new App().render();


document.getElementById('app').appendChild(
  app
);