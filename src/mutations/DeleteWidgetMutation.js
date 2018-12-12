import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

// import { AllWidgetsQuery, ALL_WIDGETS_QUERY } from '../queries/AllWidgetsQuery';

const DELETE_WIDGET_MUTATION = gql`
    mutation DeleteWidgetMutation($widgetId: Int) {
        deleteWidget(widgetId: $widgetId)
    }
`;

export const DeleteWidgetMutation = (props) => {
    return <Mutation mutation={DELETE_WIDGET_MUTATION}>
        {(mutate) => {
            const deleteWidget = widgetId => {
                mutate({
                    variables: { widgetId },
                    // refetchQueries: [{ query: ALL_WIDGETS_QUERY }]
                    refetchQueries: props.refetchQueries,
                })
            }

            // return <AllWidgetsQuery onDeleteWidget={deleteWidget} />

            const PresentationalComponent = props.component;
            return <PresentationalComponent onDeleteWidget={deleteWidget} {...props} />;

        }}
    </Mutation>
}