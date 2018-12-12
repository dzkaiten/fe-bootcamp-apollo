import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { WidgetForm } from './components/WidgetForm';
import { CarForm } from './components/CarForm'

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

const APPEND_WIDGET_MUTATION = gql`
  mutation AppendWidget($widget: WidgetInput) {
    appendWidget(widget: $widget) {
      id
      name
    }
  }
`;

const APPEND_CAR_MUTATION = gql`
  mutation AppendCar($car: CarInput) {
    appendCar(car: $car) {
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
  return <>
  <Query query={APP_QUERY}>
    {({ loading, errors, data }) => {
      console.log('data:', data);
      if (loading) return 'Loading';
      if (errors) return 'Errors';

      return <>
        <h1>Widget List</h1>
        <ul>
          {data.widgets.map(w => <li key={w.id}>{w.id} {w.name}</li>)}
        </ul>

        <h1>Car List</h1>
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
  </Query>

  <Mutation mutation={APPEND_WIDGET_MUTATION}>
  {(mutate) => {

    const appendWidget = widget => {
      return mutate({
        mutation: APPEND_WIDGET_MUTATION,
        variables: { widget },
        refetchQueries: [
          { query: APP_QUERY,}
        ],
        // optimisticResponse: {
        //   appendWidget: {
        //     ...widget,
        //     id: -1,
        //     __typename: 'Widget',
        //   }
        // },
        // update(store, { data: { appendWidget: widget }}) {
        //   let data = store.readQuery({ query: APP_QUERY });
        //   data = data.widgets.concat(widget);
        //   store.writeQuery({ query: APP_QUERY, data });
        // }
      });
    };

    return <WidgetForm onSubmitWidget={appendWidget} />;
    
  }}

  </Mutation>

  <Mutation mutation={APPEND_CAR_MUTATION}>
  {(mutate) => {

    const appendCar = car => {
      return mutate({
        mutation: APPEND_CAR_MUTATION,
        variables: { car },
        refetchQueries: [
          { query: APP_QUERY,}
        ],
        // optimisticResponse: {
        //   appendCar: {
        //     ...car,
        //     id: -1,
        //     __typename: 'Car',
        //   }
        // },
        // update(store, { data: { appendCar: car }}) {
        //   let data = store.readQuery({ query: APP_QUERY });
        //   data = data.cars.concat(car);
        //   store.writeQuery({ query: APP_QUERY, data });
        // }
      });
    };

    return <CarForm onSubmitCar={appendCar} />;
    
  }}

  </Mutation>


  </>;
}