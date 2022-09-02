import React, {useEffect} from 'react';
// import {useDispatch} from 'react-redux';
// import {resetActivities} from '../../redux/actions/index';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import styles from './ActivityCard.module.scss';
import {NavLink} from 'react-router-dom';

const ActivityCard = ({name, season, duration, difficulty, countries, image, id}) => {


    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'mauro4202214'
        }
    });

    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image(image);


    useEffect(() => {
        console.log(myImage)
    }, [myImage])

    return(
        <div className={styles.actCardContainer}>
            <NavLink to={`/activityDetail/${id}`}>
                <h2>{name}</h2>
                <AdvancedImage cldImg={myImage} className={styles.img}/>
            </NavLink>
        </div>
    )
}

export default ActivityCard;