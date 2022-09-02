import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styles from  './Landing.module.scss'
import avion from '../../img/avion.svg';
import { getCountries } from '../../redux/actions';
import {useDispatch}  from 'react-redux';



const Landing = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    return(
            <div className={styles.capa}>
                <img src={avion} className={styles.avion} alt="Avion de papel"/>
                <div>
                    <h1>La app que necesitas para armar tus vaciones</h1>
                    <NavLink to='/home'><button>INGRESA</button></NavLink>
                </div>
            </div>
    )
}


export default Landing;