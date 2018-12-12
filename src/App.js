import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { WidgetForm } from './components/WidgetForm';
import { CarForm } from './components/CarForm';
import { CarTable } from './components/CarTable';

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

const DELETE_CAR_MUTATION = gql`
  mutation DeleteCar($varCarId: Int) {
    deleteCar(carId: $varCarId) 
  }
`

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
        <Mutation mutation={DELETE_CAR_MUTATION}>
          {(mutate) => {
            const deleteCar = (carId) => {
              return mutate( {
                variables: { varCarId: carId }, // populates $varCarId in mutation
                update(store, { data: { deleteCar: carId } }) {
                  let data = store.readQuery({ query: APP_QUERY });
                  data = { ...data, cars: data.cars.filter(c => c.id !== carId) };
                  store.writeQuery({ query: APP_QUERY, data });
                }
              })
            }
            return <CarTable cars={data.cars} onDeleteCar={deleteCar}/>
          }}
        </Mutation>    
    </>;
    }}
  </Query>

  <Mutation mutation={APPEND_WIDGET_MUTATION}>
    {(mutate) => {
      const appendWidget = widget => {
        return mutate({
          mutation: APPEND_WIDGET_MUTATION,
          variables: { widget },
          
          /* This refreshes the entire widgets list like we did before */
          // refetchQueries: [
          //   { query: APP_QUERY,}
          // ],
          
          /* This shows in the client but does not reflect in the server instantly */
          // optimisticResponse: {
          //   appendWidget: {
          //     ...widget,
          //     id: -1,
          //     __typename: 'Widget',
          //   }
          // },

          update(store, { data: { appendWidget: widget } }) {
            let data = store.readQuery({ query: APP_QUERY });
            data = { ...data, widgets: data.widgets.concat(widget) };
            store.writeQuery({ query: APP_QUERY, data });
          }
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
        
        // refetchQueries: [
        //   { query: APP_QUERY,}
        // ],
        
        optimisticResponse: {
          appendCar: {
            ...car,
            id: -1,
            __typename: 'Car',
          }
        },
        
        update(store, { data: { appendCar: car }}) {
          let data = store.readQuery({ query: APP_QUERY });
          data = {...data, cars: data.cars.concat(car) };
          store.writeQuery({ query: APP_QUERY, data });
        }
      });
    };
    return <CarForm onSubmitCar={appendCar}/>;
  }}

  </Mutation>














  {/* <Mutation mutation={DELETE_CAR_MUTATION}>
    {(mutate) => {

      const deleteCar = id => {
        return mutate({
          mutation: DELETE_CAR_MUTATION,
          variables: { id },
          
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
          //   data = {...data, cars: data.cars.concat(car) };
          //   store.writeQuery({ query: APP_QUERY, data });
          // }
        });
      };
    }}

  </Mutation> */}

  </>;
}