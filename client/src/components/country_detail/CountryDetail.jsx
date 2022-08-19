import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from  './CountryDetail.module.scss';
import {getCountryDetail} from '../../redux/actions/index';
import MapView from '../map/MapView';
import 'leaflet/dist/leaflet.css';




const CountryDetails = (props) => {

    const dispatch = useDispatch();
    const country = useSelector((state) => state.countryDetail)
    const id = props.match.params.id;
	
	useEffect(()=>{
		dispatch(getCountryDetail(id))
	}, [dispatch, id])

    return(
        <div className={styles.container}>
           <div className={styles.containerCountryDetail}>
                <div className={styles.title}>
                    <h2>{country.name}</h2>
                </div>
                <div className={styles.info}>
                    <p>Capital: {country.capital}</p>
                    <p>Continente: {country.continent}</p>
                    <p>Subregion:{country.subregion}</p>
                    <p>Codigo internacional: {country.id}</p>
                    <p>Área: {country.area}</p>
                    <p>Poblacion: {country.population}</p>
                    <h3>Actividades</h3>
                    {
                        country.activities && country.activities.length > 0 ? country.activities.map(a => <span>{a.name}</span>)
                        : <p>No hay actividades registradas</p>
                    }
                </div>
                <div className={styles.containerFlagMap}>
                    <img src={country.img} alt={country.name} />
                    {
                        country.lat && country.long ? <MapView lat={country.lat} long={country.long} area={country.area} styles={styles.map}/> : <p>Loanding</p>
                    }
                </div>
           </div>
        </div>
    )
}


export default CountryDetails;