import React from 'react';

import { ViewCarRow } from '../components/ViewCarRow';
import { EditCarRow } from '../components/EditCarRow';

export const CarTable = ( {cars, onEditCar, editCarId} ) => {

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
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {cars.map(car => (car.id !== editCarId) ?
                <ViewCarRow key={car.id} carRow={car} onEditCar={onEditCar} /> : 
                <EditCarRow key={car.id} carRow={car} />)}
            </tbody>
        </table>    
    </>
}