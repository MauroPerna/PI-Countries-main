import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const GET_COUNTRIES = 'GET_COUNTRIES';
export const GET_COUNTRIES_FILTERED = 'GET_COUNTRIES_FILTERED';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT';
export const FILTER_BY_ORDER = 'FILTER_BY_ORDER';
export const FILTER_BY_POPULATION = 'FILTER_BY_POPULATION';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const RESET_COUNTRY_DETAIL = 'RESET_COUNTRY_DETAIL';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
export const RESET_ACTIVITIES = 'RESET_ACTIVITIES';


export const getCountries = () => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/countries`)
			.then(response => response.json())
			.then(info => dispatch({type:GET_COUNTRIES, payload: info}))
    } 
}

export const getCountriesFiltered = (condition) => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/countries?name=${condition}`)
			.then(response => response.json())
			.then(info => dispatch({type:GET_COUNTRIES_FILTERED, payload: info}))
    } 
}

export const getCountryDetail = (id) => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/countries/${id}`)
			.then(response => response.json())
			.then(info => dispatch({type:GET_COUNTRY_DETAIL, payload: info}))
    } 
}

export const getActivities = () => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/activities`)
            .then(response => response.json())
            .then(info => dispatch({type:GET_ACTIVITIES, payload: info}))
    }
}

export const byActivity = (activity) => {
    return {type: FILTER_BY_ACTIVITY, payload: activity}
}

export const byContinent = (continent) => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/countries?continent=${continent}`)
            .then(response => response.json())
            .then(info => dispatch({type: FILTER_BY_CONTINENT, payload: info}))
    }
}

export const byOrder = (order) => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/countries?order=${order}`)
            .then(response => response.json())
            .then(info => dispatch({type: FILTER_BY_ORDER, payload: info}))
    }
}

export const byPopulation = (population) => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/countries?population=${population}`)
            .then(response => response.json())
            .then(info => dispatch({type: FILTER_BY_POPULATION, payload: info}))
    }
}

export const postActivity = (obj) => {
    return async function () {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/activities`, obj)
            MySwal.fire({
                title: '👍',
                footer: 'La actividad se creo exitosamente',
                didOpen: () => {
                    // `MySwal` is a subclass of `Swal`
                    //   with all the same instance & static methods
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire(<p>La actividad "{res.data.name}" se creo exitosamente</p>)
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const resetDetail = () => {
    return {type: RESET_COUNTRY_DETAIL}
}

export const resetActivities = () => {
    return {type: RESET_ACTIVITIES}
}


export const deleteActivity = (id) => {
    return async function () {
        try {
            const swalWithBootstrapButtons = MySwal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: true
            })
              
            swalWithBootstrapButtons.fire({
              title: 'Estas seguro?',
              text: "Tu no podras recuperar esta actividad",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Si, borrar',
              cancelButtonText: 'No, cancelar',
              reverseButtons: true
            }).then((result) => {
              if (result.isConfirmed) {
                axios.delete(`${process.env.REACT_APP_API}/activities?id=${id}`)
                swalWithBootstrapButtons.fire(
                  'Borrado!',
                  'La actividad ha sido borrada.',
                  'success'
                )
              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === MySwal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelado',
                  'La actividad no ha sido borrada :)',
                  'error'
                )
              }
            })
            // MySwal.fire({
            //     title: '👍',
            //     footer: 'La actividad se borro exitosamente',
            //     didOpen: () => {
            //         // `MySwal` is a subclass of `Swal`
            //         //   with all the same instance & static methods
            //         MySwal.clickConfirm()
            //     }
            // }).then(() => {
            //     return MySwal.fire(<p>La actividad se borro exitosamente</p>)
            // })
            return {type: DELETE_ACTIVITY, payload: id}
        } catch (error) {
            console.log(error)
        }
    }
} 

export const getActivity = (id) => {
    return async function(dispatch) {
        return fetch(`${process.env.REACT_APP_API}/activities?id=${id}`)
            .then(response => response.json())
            .then(info => dispatch({type: GET_ACTIVITY, payload: info}))
    }
}

export const putActivity = (obj) => {
    return async function () {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API}/activities`, obj)
            MySwal.fire({
                title: '👍',
                footer: 'La actividad se borro exitosamente',
                didOpen: () => {
                    // `MySwal` is a subclass of `Swal`
                    //   with all the same instance & static methods
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire(<p>La actividad: "{res.data.name}" ha sido modificada</p>)
            })
        } catch (error) {
            console.log(error)
        }
    }
}