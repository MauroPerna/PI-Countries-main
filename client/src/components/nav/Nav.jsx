import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles from './Nav.module.scss';
import {getCountriesFiltered} from'../../redux/actions/index';
import logo from '../../img/logo.svg';
import { FaSearch } from "react-icons/fa";

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
        setInput('');
    }

    return(
        <header>
            <img src={logo} className={styles.logo} alt="Logo"/>
            <form onSubmit={onSubmit} className={styles.searchBarContainer}>
                <input type="text" 
                    name="text"
                    placeholder="Ingrese un pais, continente"
                    onChange={handleInput}
                    value={input}
                    className={styles.input}
                />
                <button type='submit'><FaSearch/></button>
            </form>
            <nav>
                <ul className={styles.ul}>
                    <NavLink to='/home'><li>HOME</li></NavLink>
                    <NavLink to='/createActivity'><li>CREAR ACTIVIDAD</li></NavLink>
                    <NavLink to='/modified'><li>MODIFICAR ACTIVIDAD</li></NavLink>
                </ul>
            </nav>
        </header>
    )
}

export default Nav;