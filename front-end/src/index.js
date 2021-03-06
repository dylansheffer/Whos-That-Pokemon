import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'normalize.css';
import 'dialog-polyfill/dist/dialog-polyfill.css';
import { GlobalStyle } from './styles/global';

const apiUri = process.env.REACT_APP_GRAPHQL;

const client = new ApolloClient({
  uri: apiUri,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
