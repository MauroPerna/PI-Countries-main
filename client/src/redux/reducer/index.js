import {GET_COUNTRIES,
        GET_COUNTRIES_FILTERED, 
        GET_ACTIVITIES, 
        FILTER_BY_ACTIVITY, 
        FILTER_BY_CONTINENT,
        FILTER_BY_ORDER,
        FILTER_BY_POPULATION,
        GET_COUNTRY_DETAIL,
        RESET_COUNTRY_DETAIL,
        GET_ACTIVITY,
        DELETE_ACTIVITY} from '../actions/index'


const initialState = {
	countries: [],
    countriesFiltered: [],
    activities: [],
    countryDetail: {},
    activityDetail: {}
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
            }
        case GET_COUNTRIES_FILTERED:
            return {
                ...state,
                countriesFiltered: action.payload
            }
        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: action.payload[0]
            }
        case RESET_COUNTRY_DETAIL:
            return {
                ...state,
                countryDetail: {}
            }
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
        case  GET_ACTIVITY:
            const actividades = state.activities;
            const actividad = actividades.find(a => a.name === action.payload) 
            return {
                ...state,
                activityDetail: actividad
            }
        case DELETE_ACTIVITY:
            const act = state.activities;
            const activitiesFiltered = act.filter(a => a.name !== action.payload)
            return {
                ...state,
                activities: activitiesFiltered
            }
        case FILTER_BY_ACTIVITY:
            const activities = state.activities;
            const activity = activities.find(a => a.name === action.payload);
            const activityCountries = activity ? activity.countries : state.countries;
            return {
                ...state,
                countriesFiltered: activityCountries
            }
        case FILTER_BY_CONTINENT:
            return {
                ...state,
                countriesFiltered: action.payload
            }
        case FILTER_BY_ORDER:
            return {
                ...state,
                countriesFiltered: action.payload
            }
        case FILTER_BY_POPULATION:
            return {
                ...state,
                countriesFiltered: action.payload
            }
        default: return {...state};
    }
}

export default rootReducer;