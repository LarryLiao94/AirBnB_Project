import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as spotActions from '../../store/spot'

function DeleteSpot({ spotId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(spotActions?.currentUserSpots());
    }, [dispatch]);

    const deleteSpot = () => {
        dispatch(spotActions.deleteSpotByID(spotId));
    };

    return (
        <button className='remove_button' onClick={deleteSpot}><i className="fa-solid fa-trash"></i></button>
    )
}

export default DeleteSpot;