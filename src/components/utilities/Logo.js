import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo/ic_launcher_mdpi.png'

function Logo() {
    return (
        <Link to='/'>
            <img src={logoImg} alt='logo' />
        </Link>
    )
}

export default Logo