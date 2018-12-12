import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_CARS_QUERY = gql`
    query AllCars {
        editCarId @client
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

export const AllCarsQuery = (props) => {
    return <Query query={ALL_CARS_QUERY}>
        {({ loading, errors, data, client }) => {
            if (loading) return 'Loading';
            if (errors) return 'Errors';

            const PresentationalComponent = props.component;

            const editCar = editCarId => {
                console.log('editCar called with id: ', editCarId);
                client.mutate({
                    mutation: gql`
                        mutation EditCar($editCarId: Int) {
                            editCar(editCarId: $editCarId) @client
                        }
                    `,
                    variables: { editCarId },
                });
            }   
            return <PresentationalComponent cars={data.cars} onEditCar={editCar} editCarId={data.editCarId} {...props} />
        }}
    </Query>
}