import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_FILTERED = 'GET_COUNTRIES_FILTERED';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ORDER = 'FILTER_BY_ORDER';
export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const RESET_COUNTRY_DETAIL = 'RESET_COUNTRY_DETAIL';
export const  GET_ACTIVITY = 'GET_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';

export const getCountries = () => {
    return async function(dispatch) {
        return fetch('http://localhost:3001/countries')
			.then(response => response.json())
			.then(info => dispatch({type:GET_COUNTRIES, payload: info}))
    } 
}

export const getCountriesFiltered = (condition) => {
    return async function(dispatch) {
        return fetch(`http://localhost:3001/countries?name=${condition}`)
			.then(response => response.json())
			.then(info => dispatch({type:GET_COUNTRIES_FILTERED, payload: info}))
    } 
}

export const getCountryDetail = (id) => {
    return async function(dispatch) {
        return fetch(`http://localhost:3001/countries/${id}`)
			.then(response => response.json())
			.then(info => dispatch({type:GET_COUNTRY_DETAIL, payload: info}))
    } 
}

export const getActivities = () => {
    return async function(dispatch) {
        return fetch('http://localhost:3001/activities')
            .then(response => response.json())
            .then(info => dispatch({type:GET_ACTIVITIES, payload: info}))
    }
}

export const byActivity = (activity) => {
    return {type: FILTER_BY_ACTIVITY, payload: activity}
}

export const byContinent = (continent) => {
    return async function(dispatch) {
        return fetch(`http://localhost:3001/countries?continent=${continent}`)
            .then(response => response.json())
            .then(info => dispatch({type: FILTER_BY_CONTINENT, payload: info}))
    }
}

export const byOrder = (order) => {
    return async function(dispatch) {
        return fetch(`http://localhost:3001/countries?order=${order}`)
            .then(response => response.json())
            .then(info => dispatch({type: FILTER_BY_ORDER, payload: info}))
    }
}

export const byPopulation = (population) => {
    return async function(dispatch) {
        return fetch(`http://localhost:3001/countries?population=${population}`)
            .then(response => response.json())
            .then(info => dispatch({type: FILTER_BY_POPULATION, payload: info}))
    }
}

export const postActivity = (obj) => {
    return async function () {
        try {
            const res = await axios.post('http://localhost:3001/activities', obj)
            alert(`La actividad: "${res.data.name}" ha sido creada`);
            // alert(res.data);
        } catch (error) {
            console.log(error)
        }
    }
}

export const resetDetail = () => {
    return {type: RESET_COUNTRY_DETAIL}
}


export const deleteActivity = (name) => {
    return async function () {
        try {
            const res = await axios.delete(`http://localhost:3001/activities?name=${name}`)
            return {type: DELETE_ACTIVITY, payload: name}
        } catch (error) {
            console.log(error)
        }
    }
} 

export const getActivity = (name) => {
    return {type: GET_ACTIVITY, payload: name}
}