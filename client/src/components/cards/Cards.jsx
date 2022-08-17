import React, {useEffect, useState}  from 'react';
import { getCountries } from '../../redux/actions';
import {useSelector, useDispatch}  from 'react-redux';
import Card from '../country_card/Card';
import styles from './Cards.module.scss';
import Paginado from '../paginado/Paginado'


const Cards = () => {

    const dispatch = useDispatch();
    let countries = useSelector((state) => state.countries);
    let countriesFiltered = useSelector((state) => state.countriesFiltered);

    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(9);


    const indexOfLastCountry = currentPage * countriesPerPage; // 10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0
    const currentCountries = countriesFiltered.length > 0 ? 
                             countriesFiltered.slice(indexOfFirstCountry, indexOfLastCountry) :
                             countries.slice(indexOfFirstCountry, indexOfLastCountry);


    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    }

    useEffect(() => {
        dispatch(getCountries());
        console.log(currentPage);
    }, [dispatch, currentPage]);


    return(
        <div className={styles.cardsContainer}>
            <Paginado
                countriesPerPage={countriesPerPage}
                countries={countriesFiltered.length > 0 ? countriesFiltered.length : countries.length}
                paginado={paginado}
            />
            {
                currentCountries ? currentCountries.map(country => <Card name={country.name}
                                                                          img={country.img}
                                                                          continent={country.continent}
                                                                          id={country.id}
                                                                          key={country.id}/>)
                : <p>Loanding</p>
            }
        </div>
    )
}


export default Cards;