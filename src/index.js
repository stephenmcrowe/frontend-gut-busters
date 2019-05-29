import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as io from 'socket.io-client';
import reducers from './reducers';
import AppWithSocket from './components/app';
import SocketContext from './socket-context';

// connect to socket
const socketserver = 'https://gut-busters.herokuapp.com/';// 'http://localhost:9090';
const socket = io(socketserver);

// connecting to the socket
socket.on('connect', () => { console.log('socket.io connected'); });
socket.on('disconnect', () => { console.log('socket.io disconnected'); });
socket.on('reconnect', () => { console.log('socket.io reconnected'); });
socket.on('error', (error) => { console.log(error); });

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <SocketContext.Provider value={socket}>
      <AppWithSocket />
    </SocketContext.Provider>
  </Provider>,
  document.getElementById('main'),
);
