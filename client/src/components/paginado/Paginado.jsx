import React from 'react';
import styles from './Paginado.module.scss'
import {FaAngleDoubleRight} from "react-icons/fa";
import {FaAngleDoubleLeft} from "react-icons/fa";


export default function Paginado({countriesPerPage, countries, paginado, currentPage, setCurrentPage}){
    
    const maxPag = Math.ceil(((countries - 9)/countriesPerPage) + 1);
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
                <FaAngleDoubleLeft/>
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
            <div className={styles.numOfPage}>
                <p>Página</p>
                <p>{currentPage}</p>
                <p>de</p>
                <p>{maxPag}</p>
            </div>
            <button onClick={handleNextBtn}
                    disabled={currentPage === Math.ceil(((countries - 9)/countriesPerPage) + 1) ? true : false}
            >
                <FaAngleDoubleRight/>
            </button>
        </nav>
    )

}