import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from  './CountryDetail.module.scss';
import {getCountryDetail} from '../../redux/actions/index';
import MapView from '../map/MapView';
import 'leaflet/dist/leaflet.css';
import pergamino from '../../img/pergamino.svg';
import ActivityCard from '../activity_card/ActivityCard';
import ReactLoading from 'react-loading';


function divisor(input) {
    return new Intl.NumberFormat().format(input);
}


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
                    <img src={pergamino} className={styles.pergamino} alt="Pergamino"/>
                    <div className={styles.infoContainer}>
                        <h2>Información</h2>
                        <p>Capital: {country.capital}</p>
                        <p>Continente: {country.continent}</p>
                        <p>Subregión: {country.subregion}</p>
                        <p>Código internacional: "{country.id}"</p>
                        <p>Área: {divisor(country.area)} km²</p>
                        <p>Población: {divisor(country.population)} habitantes</p>
                    </div>
                </div>
                <div className={styles.containerFlagMap}>
                    <img src={country.img} alt={country.name} />
                    {
                        country.lat && country.long ? <MapView lat={country.lat} long={country.long} area={country.area} styles={styles.map}/> : <ReactLoading type="spin" color="fff" height={300} width={300}/>
                    }
                </div>
            </div>
            
            <div className={styles.titleActivities}><h2>Actividades</h2></div>
            <div className={styles.containerActivities}>
                    {
                        country.activities && country.activities.length > 0 ? country.activities.map(a =>
                                                                                    <ActivityCard name={a.name}
                                                                                                  season={a.season}
                                                                                                  duration={a.duration}
                                                                                                  difficulty={a.difficulty}
                                                                                                  image={a.image}
                                                                                                  id={a.id}
                                                                                                  key={a.id}
                                                                                                  />
                                                                              )
                        : <p>No hay actividades registradas</p>
                    }
            </div>
        </div>
    )
}


export default CountryDetails;