import React from 'react';
import styles from './Paginado.module.scss'


export default function Paginado({countriesPerPage, countries, paginado}){
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(((countries - 9)/countriesPerPage) + 1); i++) {
        pageNumbers.push(i)  
    }

    return(
        <nav className={styles.nav}>
            <ul className={styles.paginado}>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return(
                            <li key={number} className={styles.li}>
                                <button onClick={() => paginado(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    )

}