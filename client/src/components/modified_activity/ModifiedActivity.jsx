import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getActivities} from '../../redux/actions/index'
import ActivityCard from '../activity_card/ActivityCard';
import styles from './ModifiedActivity.module.scss';
import wrong from '../../img/wrong.svg';
import { NavLink } from 'react-router-dom';


const ModifiedActivity = () => {

    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch])


    return(
        <div className={styles.container}>
            <div className={styles.activitiesContainer}>
                {

                    activities.length > 0 ? activities.map(a => 
                        <ActivityCard name={a.name}
                                    season={a.season}
                                    duration={a.duration}
                                    difficulty={a.difficulty}
                                    countries={a.countries}
                                    image={a.image}
                                    id={a.id}
                                    key={a.id}/>
                    )
                    :   <div className={styles.loanding}>
                            <img src={wrong} alt="wrong"/>
                            <div>
                                <h2>No hay actidades creadas</h2>
                                <NavLink to='/createActivity'>
                                    <button>
                                        Crear actividad
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default ModifiedActivity;