import React, {useEffect} from 'react';
import styles from './SearchBar.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {getCountriesFiltered,
        getActivities,
        byActivity,
        byContinent,
        byOrder,
        byPopulation} from '../../redux/actions/index'


const SearchBar = ({setCurrentPage}) => {
    
    const [input, setInput] = React.useState('')

    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);

    // manejador de la barra de busqueda
    const handleInput = (e) => {
		e.preventDefault();
		setInput(e.target.value)
	}

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(getCountriesFiltered(input));
        setCurrentPage(1)
    }


    //manejador del selector de actividades
    const handleActivities = (e) => {
        e.preventDefault();
        dispatch(byActivity(e.target.value))
        setCurrentPage(1)
    }

    //manejador del selector de continentes
    const handleContinents = (e) => {
        e.preventDefault();
        dispatch(byContinent(e.target.value))
        setCurrentPage(1)
    }

    //manejador del selector de orden
    const handleOrder = (e) => {
        e.preventDefault();
        dispatch(byOrder(e.target.value))
        setCurrentPage(1)
    }

    //manejador del selector de population
    const handleOrderPopulation = (e) => {
        e.preventDefault();
        dispatch(byPopulation(e.target.value))
        setCurrentPage(1)
    }

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch])

    return(
        <div className={styles.mainContainer}>
            <form onSubmit={onSubmit} className={styles.searchBarContainer}>
                <input type="text" 
                    name="text"
                    placeholder="Ingrese un pais, continente"
                    onChange={handleInput}
                    className={styles.input}
                />
                <button type='submit'>Buscar</button>
            </form>


            <div className={styles.filterContainer}>
                <select onChange={handleContinents}>
                    <option value='All' key='All'>All continents</option>
                    <option value='Africa' key='Africa'>Africa</option>
                    <option value='Antarctica' key='Antarctica'>Antarctica</option>
                    <option value='Asia' key='Asia'>Asia</option>
                    <option value='Europe' key='Europe'>Europe</option>
                    <option value='North America' key='NorthAmerica'>North America</option>
                    <option value='Oceania' key='Oceania'>Oceania</option>
                    <option value='South America' key='SouthAmerica'>South America</option>
                </select>

                <select onChange={handleActivities}>
                    <option value='All' key='All'>All activities</option>
                    {
                        activities ? 
                        activities.map(activity => {
                            return <option value={activity.name} key={activity.id}>{activity.name}</option>
                        })
                        : null
                    }
                </select>


                <select onChange={handleOrder}>
                    <option value='All' key='All'>Order</option>
                    <option value='Asc' key='Asc'>A-Z</option>
                    <option value='Desc' key='Desc'>Z-A</option>
                </select>


                <select onChange={handleOrderPopulation}>
                    <option value='Max' key='Max'>Max population</option>
                    <option value='Min' key='Min'>Min population</option>
                </select>
            </div>
        </div>
    )
}


export default SearchBar;