import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { ALL_CARS_QUERY } from '../queries/AllCarsQuery';
const DELETE_CAR_MUTATION = gql`
  mutation DeleteCar($varCarId: Int) {
    deleteCar(carId: $varCarId) 
  }
`

export const DeleteCarMutation = (props) => {
    return <Mutation mutation={DELETE_CAR_MUTATION}>
        {(mutate) => {
        const deleteCar = carId => {
            mutate({
                variables: { varCarId: carId }, // populates $varCarId in gql above
                update(store, { data: { deleteCar: carId } }) {
                    let data = store.readQuery({ query: ALL_CARS_QUERY });
                    data = { ...data, cars: data.cars.filter(c => c.id !== carId) };
                    store.writeQuery({ query: ALL_CARS_QUERY, data });
                }
            })
        }
        
        const PresentationalComponent = props.component;
        return <PresentationalComponent onDeleteCar={deleteCar} {...props} />;
        // return <CarTable cars={data.cars} onDeleteCar={deleteCar}/>

        }}
    </Mutation>
}