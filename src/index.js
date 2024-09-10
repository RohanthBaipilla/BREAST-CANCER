// // index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
import App from './App';
import { AppRegistry } from 'react-native';

// Register the app with react-native-web
AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
