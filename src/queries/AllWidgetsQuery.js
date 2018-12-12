import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// import { WidgetList } from '../components/WidgetList'

export const ALL_WIDGETS_QUERY = gql`
    query AllWidgets {
        widgets {
            id
            name
        }
    }
`;

export const AllWidgetsQuery = (props) => {
    return <Query query={ALL_WIDGETS_QUERY}>
        {({ loading, errors, data }) => {
            if (loading) return 'Loading';
            if (errors) return 'Errors';

            const PresentationalComponent = props.component;
            return <PresentationalComponent widgets={data.widgets} {...props} />
        }}
    </Query>
}