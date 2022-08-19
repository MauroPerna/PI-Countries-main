import React from 'react';
import styles from './Card.module.scss';
import {NavLink} from 'react-router-dom'

const Card = ({name, img, continent, id}) => {

    return(
        <div className={styles.cardContainer}>
            <NavLink to={`/countryDetail/${id}`}>
                <h2>{name}</h2>
                <img src={img} alt={name} className={styles.img}/>
                <p>{continent}</p>
            </NavLink>
        </div>
    )
}


export default Card;