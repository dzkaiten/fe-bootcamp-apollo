import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const APP_QUERY = gql`
  query AppQuery {
    message
  }
`;

export class App extends React.Component {

  render() {
    return <Query query={APP_QUERY}>
      {({ loading, error, data }) => {

        if (loading) return 'Loading...';
        if (error) return 'Error...';

        return <h1>{data.message}</h1>;

      }}
    </Query>;
  }

}
