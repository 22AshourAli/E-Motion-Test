import React from 'react';
import notFoundImg from '../../images/error.svg'
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='d-flex vh-100 flex-column align-items-center justify-content-center py-5'>
            <img src={notFoundImg} className='w-50' alt="" />
            <NavLink className={'text-main '} to={'/'}>Go To Products Page</NavLink>

        </div>
    );
}

export default NotFound;
