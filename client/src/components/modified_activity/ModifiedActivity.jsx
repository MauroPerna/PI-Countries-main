import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getActivities} from '../../redux/actions/index'
import ActivityDetail from '../activity_detail/ActivityDetail';

const ModifiedActivity = () => {

    const dispatch = useDispatch();
    const activities = useSelector((state) => state.activities);

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch])


    return(
        <div>
            {

                activities && activities.map(a => 
                    <ActivityDetail name={a.name}
                            season={a.season}
                            duration={a.duration}
                            difficulty={a.difficulty}
                            countries={a.countries}
                            image={a.image}
                            id={a.id}/>
                    )
            }
        </div>
    )
}

export default ModifiedActivity;