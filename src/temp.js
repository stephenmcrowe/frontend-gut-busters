import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as io from 'socket.io-client';
import reducers from './reducers';
// import SocketContext from './socket-context';
import App from './components/app';

// connect to socket
const socketserver = 'http://localhost:9090';
// console.log(socketserver);
const socket = io(socketserver);

socket.on('connect', () => { console.log('socket.io connected'); });
socket.on('disconnect', () => { console.log('socket.io disconnected'); });
socket.on('reconnect', () => { console.log('socket.io reconnected'); });
socket.on('error', (error) => { console.log(error); });

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

// Socket Context Source: https://itnext.io/how-to-use-a-single-instance-of-socket-io-in-your-react-app-6a4465dcb398

// we now wrap App in a Provider
ReactDOM.render(
  // <SocketContext.Provider value={socket}>
  <Provider store={store}>
    <App />
  </Provider>,
  {/* </SocketContext.Provider>, */},
  document.getElementById('main'),
);
