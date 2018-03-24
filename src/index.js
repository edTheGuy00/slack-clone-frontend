import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, from } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: 'http://localhost:8080/graphql' });

const getTokenMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      'x-token': localStorage.getItem('token') || null,
      'x-refresh-token': localStorage.getItem('refreshToken') || null,
    },
  }));

  return forward(operation);
});

const setTokenAfterware = new ApolloLink((operation, forward) => {
  return forward(operation).map((res) => {
    const context = operation.getContext();
    const { response: { headers } } = context;

    const token = headers.get['x-token'];
    const refreshToken = headers.get['x-refresh-token'];

    if (token) {
      localStorage.setItem('token', token);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    return res;
  });
});

const client = new ApolloClient({
  link: from([
    getTokenMiddleware,
    setTokenAfterware.concat(httpLink),
  ]),
  cache: new InMemoryCache(),
});

const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();
