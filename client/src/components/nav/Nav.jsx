import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles from './Nav.module.scss';
import {getCountriesFiltered} from'../../redux/actions/index';

const Nav = () => {
    const [input, setInput] = useState('')

    const dispatch = useDispatch();

    const handleInput = (e) => {
		e.preventDefault();
		setInput(e.target.value)
	}

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountriesFiltered(input));
    }

    return(
        <header>
            <form onSubmit={onSubmit} className={styles.searchBarContainer}>
                <input type="text" 
                    name="text"
                    placeholder="Ingrese un pais, continente"
                    onChange={handleInput}
                    className={styles.input}
                />
                <button type='submit'>Buscar</button>
            </form>
            <nav>
                <ul className={styles.ul}>
                    <NavLink to='/home'><li>Home</li></NavLink>
                    <NavLink to='/createActivity'><li>Crear actividad</li></NavLink>
                    <NavLink to='/modified'><li>Modificar actividad</li></NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;