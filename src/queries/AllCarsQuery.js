import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const ALL_CARS_QUERY = gql`
    query AllCars {
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
        {({ loading, errors, data }) => {
            if (loading) return 'Loading';
            if (errors) return 'Errors';

            console.log('data in QUery', data);

            const PresentationalComponent = props.component;
            return <PresentationalComponent cars={data.cars} {...props} />
        }}
    </Query>
}