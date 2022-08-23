import React from 'react';
import styles from './Paginado.module.scss'
import arrowback from '../../img/arrowback.png';
import arrowfront from '../../img/arrowfront.png';


export default function Paginado({countriesPerPage, countries, paginado, currentPage, setCurrentPage}){
    const pageNumbers = [];

    const handleNextBtn = () => {
        const lastPage = Math.ceil(((countries - 9)/countriesPerPage) + 1);
        if(currentPage < lastPage) setCurrentPage(currentPage + 1); 
    }
    
    const handlePrevBtn = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    for (let i = 1; i <= Math.ceil(((countries - 9)/countriesPerPage) + 1); i++) {
        pageNumbers.push(i)  
    }

    return(
        <nav className={styles.nav}>
            <button onClick={handlePrevBtn}
                    disabled={currentPage === 1 ? true : false}
            >
                <img src={arrowback} styles={styles.arrow}/>
            </button>
            {/* Esto hace el filtrado con numeros  */}
            {/* <ul className={styles.paginado}>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return(
                            <li key={number} className={styles.li}>
                                <button onClick={() => paginado(number)}>{number}</button>
                            </li>
                        )
                    })
                }
            </ul> */}
            <button onClick={handleNextBtn}
                    disabled={currentPage === Math.ceil(((countries - 9)/countriesPerPage) + 1) ? true : false}
            >
                <img src={arrowfront} styles={styles.arrow}/>
            </button>
        </nav>
    )

}