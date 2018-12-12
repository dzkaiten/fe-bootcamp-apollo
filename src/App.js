import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { AllWidgetsQuery, ALL_WIDGETS_QUERY } from './queries/AllWidgetsQuery';
import { DeleteWidgetMutation } from './mutations/DeleteWidgetMutation';

import { WidgetList } from './components/WidgetList';
import { WidgetForm } from './components/WidgetForm';

import { CarForm } from './components/CarForm';
import { CarTable } from './components/CarTable';
import { DeleteCarMutation } from './mutations/DeleteCarMutation';
import { AllCarsQuery } from './queries/AllCarsQuery';

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
  <DeleteWidgetMutation
    component={(props) => <AllWidgetsQuery {...props} component={props => <WidgetList {...props} />} />}
    refetchQueries={[ { query: ALL_WIDGETS_QUERY } ]}
  />

  <DeleteCarMutation
    component={(props) => <AllCarsQuery {...props} component={props => <CarTable {...props } />} />}
  />

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
            let data = store.readQuery({ query: ALL_WIDGETS_QUERY });
            data = { ...data, widgets: data.widgets.concat(widget) };
            store.writeQuery({ query: ALL_WIDGETS_QUERY, data });
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
  </>;
}