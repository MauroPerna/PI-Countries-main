import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from  './Landing.module.scss'

const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
}

const Landing = () => {
    return(
        <div className={styles.container}>
            <div style={divStyle}>
                <h1>La app que estabas buscando para armar tus vaciones</h1>
                <NavLink to='/home'><button>Ingresa ya</button></NavLink>
            </div>
        </div>
    )
}


export default Landing;