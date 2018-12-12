// 4. Create a new component named ViewCarRow. 
// The view car row will display a row of car data. 
// Utilize the ViewCarRow component in CarTable component to 
// display the car data.

import React from 'react';

export const ViewCarRow = ({ carRow, onEditCar, onDeleteCar }) => {

    return <tr>
        <td>{carRow.id}</td>
        <td>{carRow.make}</td>
        <td>{carRow.model}</td>
        <td>{carRow.year}</td>
        <td>{carRow.color}</td>
        <td>{carRow.price}</td>
        <td>
        <button type="button" onClick={() => onEditCar(carRow.id)}>Edit</button>
        <button type="button" onClick={() => onDeleteCar(carRow.id)}>Delete</button>
        </td>
    </tr>
}
