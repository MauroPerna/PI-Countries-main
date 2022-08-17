import React, {useEffect, useState}  from 'react';
import { getCountries } from '../../redux/actions';
import {useSelector, useDispatch}  from 'react-redux';
import Card from '../country_card/Card';
import styles from './Cards.module.scss';
import Paginado from '../paginado/Paginado';


const Cards = ({currentPage, setCurrentPage}) => {

    const dispatch = useDispatch();
    let countries = useSelector((state) => state.countries);
    let countriesFiltered = useSelector((state) => state.countriesFiltered);

    
    const [countriesPerPage, setCountriesPerPage] = useState(10);


    const indexOfLastCountry = currentPage * countriesPerPage; // 10
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; // 0

    if(currentPage === 1) {
        if(countriesFiltered.length > 0) {
            var currentCountries = countriesFiltered.slice(0, 9)
        } else {
            var currentCountries = countries.slice(0, 9)
        }
    } else {
        if(countriesFiltered.length > 0) {
            var currentCountries = countriesFiltered.slice(indexOfFirstCountry - 1, indexOfLastCountry - 1)
        } else {
            var currentCountries = countries.slice(indexOfFirstCountry - 1, indexOfLastCountry - 1)
        }
    }


    const paginado = (pageNumbers) => {
        setCurrentPage(pageNumbers);
    }

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);


    return(
        <div className={styles.cardsContainer}>
            <Paginado
                countriesPerPage={countriesPerPage}
                countries={countriesFiltered.length > 0 ? countriesFiltered.length : countries.length}
                paginado={paginado}
            />
            {
                currentCountries && currentCountries.map(country => <Card name={country.name}
                                                                          img={country.img}
                                                                          continent={country.continent}
                                                                          id={country.id}
                                                                          key={country.id}/>)
                
            }
        </div>
    )
}


export default Cards;