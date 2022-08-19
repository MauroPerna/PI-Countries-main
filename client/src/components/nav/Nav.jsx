import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav = () => {

    return(
        <header>
            <nav>
                <ul className={styles.ul}>
                    <NavLink to='/home'><li>Home</li></NavLink>
                    <NavLink to='/createActivity'><li>Crear actividad</li></NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;