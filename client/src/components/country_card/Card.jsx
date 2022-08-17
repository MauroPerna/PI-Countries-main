import React from 'react';
import styles from './Card.module.scss';
import {NavLink} from 'react-router-dom'

const Card = ({name, img, continent}) => {

    return(
        <div className={styles.cardContainer}>
            <NavLink to='/countryDetail'>
                <h2>{name}</h2>
                <img src={img} className={styles.img}/>
                <p>{continent}</p>
            </NavLink>
        </div>
    )
}


export default Card;