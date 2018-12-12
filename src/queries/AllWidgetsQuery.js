import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// import { WidgetList } from '../components/WidgetList'

export const ALL_WIDGETS_QUERY = gql`
    query AllWidgets {
        toolHeader @client
        editWidgetId @client
        widgets {
            id
            name
        }
    }
`;

export const AllWidgetsQuery = (props) => {
    return <Query query={ALL_WIDGETS_QUERY}>
        {({ loading, errors, data, client }) => {
            if (loading) return 'Loading';
            if (errors) return 'Errors';

            const PresentationalComponent = props.component;

            const editWidget = editWidgetId => {
            //     const query = gql`{ editWidgetId }`;
            //     let data = client.query({ query });
            //     data = { ...data, editWidgetId };
            //     client.writeQuery({ query, data });
            // }

                client.mutate({
                    mutation: gql`
                        mutation EditWidget($editWidgetId: Int) {
                            editWidget(editWidgetId: $editWidgetId) @client
                        }
                    `,
                    variables: { editWidgetId },
                });
            }

            return <div>
                <h2>{data.toolHeader} {data.editWidgetId}</h2>
                <button type="button" onClick={() => editWidget(3)}>Edit</button>
                <PresentationalComponent widgets={data.widgets} {...props} />
            </div>
        }}
    </Query>
}