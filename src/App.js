import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const APP_QUERY = gql`
  query AppQuery {
    widgets {
      id
      name
    }

    cars {
      id
      make
      model
      year
      color
      price
    }
  }
`;

export const App = () => {
  return <Query query={APP_QUERY}>
    {({ loading, errors, data }) => {
      console.log('data:', data);
      if (loading) return 'Loading';
      if (errors) return 'Errors';


      return <>
        <h1>Widget List</h1>
        <ul>
          {data.widgets.map(w => <li key={w.id}>{w.id} {w.name}</li>)}
        </ul>

        <table>
          <thead>
            <tr>
                <th>Id</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.cars.map(car => 
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td>{car.price}</td>
              </tr>)}
          </tbody>
      </table>        
    </>;
    }}
  </Query>;
}