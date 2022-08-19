import React, {useEffect, useRef} from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import { useDispatch} from 'react-redux';
import {resetDetail} from '../../redux/actions/index';


const MapView = ({lat, long, area}) => {

    const dispatch = useDispatch();

    const zoom = useRef(0)
    
    const cambioZoom = (area) => {
        if(area < 5000) {
            zoom.current = 10;
            return zoom.current;
        } else if(area >= 5000 && area < 50000) {
            zoom.current = 9;
            return zoom.current;
        } else if(area >= 50000 && area < 70000) {
            zoom.current = 8;
            return zoom.current;
        } else if(area >= 70000 && area < 100000) {
            zoom.current = 6;
            return zoom.current;
        } else if(area >= 100000 && area < 1000000){
            zoom.current = 5;
            return zoom.current;
        } else if (area >= 1000000 && area < 2000000){
            zoom.current = 4;
            return zoom.current;
        } else if (area >= 2000000 && area < 9000000) {
            zoom.current = 3;
            return zoom.current;
        } else {
            zoom.current = 2;
            return zoom.current;
        }
    }
    
    useEffect(() => {
        console.log(area, zoom.current)
        return () => {
        dispatch(resetDetail());
      }
    }, [dispatch, area, zoom])
    

    return(
        <MapContainer center={[lat, long]} zoom={cambioZoom(area)} style={{width: '100%', height: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    )
}

export default MapView;