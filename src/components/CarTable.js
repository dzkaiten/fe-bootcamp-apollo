import React from 'react';

export const CarTable = (props) => {
    return <>
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Color</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {props.cars.map(car => 
                <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.color}</td>
                <td>{car.price}</td>
                <td>
                    <button type="button" onClick={() => props.onDeleteCar(car.id)}>Delete</button>
                </td>
                </tr>)}
            </tbody>
        </table>    
    </>
}