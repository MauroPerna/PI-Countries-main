import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteActivity} from '../../redux/actions/index';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

const ActivityDetail = ({name, season, duration, difficulty, countries, image}) => {

    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'mauro4202214'
        }
    });

    // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image(image); 

    const dispatch = useDispatch();
    const activity = useSelector((state) => state.activityDetail);


    return(
        <div>
            <button onClick={() => dispatch(deleteActivity(name))}>x</button>
            <h2>{name}</h2>
            <AdvancedImage cldImg={myImage}/>
        </div>
    )
}

export default ActivityDetail;