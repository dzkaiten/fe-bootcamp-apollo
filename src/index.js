import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

import { split, ApolloLink, } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import { withClientState } from 'apollo-link-state';

import './index.css';

import gql from 'graphql-tag';


const GRAPHQL_PORT = process.env.REACT_APP_GRAPHQL_PORT || 3010;

const cache = new InMemoryCache();

const clientStateLink = withClientState({
  cache,
  defaults: { 
    toolHeader: 'Widget Tool',
    editWidgetId: -1,
    editCarId: -1,
  },
  resolvers: { 
    Mutation: {
      editWidget: (_, { editWidgetId }, { cache }) => {
        const query = gql`{ editWidgetId }`;
        let data = cache.readQuery({ query });
        data = { ...data, editWidgetId };
        cache.writeQuery({ query, data });
      },
      editCar: (_, { editCarId }, { cache }) => {
        const query = gql`{ editCarId }`;
        let data = cache.readQuery({ query });
        data = { ...data, editCarId };
        cache.writeQuery({ query, data });
      },
    }
  },
});

const httpLink = new HttpLink({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
});

const webSocketLink = new WebSocketLink({
  uri: `ws://localhost:${GRAPHQL_PORT}/graphql`,
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  ApolloLink.from([clientStateLink, httpLink]),
);

const client = new ApolloClient({
  link, cache, connectToDevTools: true,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
