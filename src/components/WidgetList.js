import React from 'react'

export const WidgetList = ( {widgets, onDeleteWidget} ) => {
    return <ul>
        {widgets.map(w => <li key={w.id}>
            {w.id} {w.name}
            <button type="button" onClick={() => onDeleteWidget(w.id)}>Delete</button>
        </li>)}
    </ul>
}