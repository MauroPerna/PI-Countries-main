import React, {useEffect, useState, useRef}from 'react';
import styles from './ActivityDetail.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {getActivity, byOrder, deleteActivity, putActivity} from '../../redux/actions/index';
import {FaUpload} from "react-icons/fa";
import infoActivity from '../../img/infoActivity.svg';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import ReactLoading from 'react-loading';



function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name = "La actividad debe tener un nombre"
    } else if(/[$&+,:;=?@#|'<>.^*()%!-\s]/.test(input.name)){
        errors.name = "El nombre de la actividad no puede tener caracteres especiales"
    }

    if(!input.difficulty) {
        errors.difficulty = "Escoja la dificultad de la actividad"
    }

    if(!input.duration) {
        errors.duration = "Debes especificar la duración de la actividad" 
    }else if(!/[0-9]+[^]+[(^|, )(hora|dia|semana|año|mes)]/.test(input.duration)){
        errors.duration = 'Debe ser un numero seguido de un indicador de periodo (horas, dias, semanas, meses, años). Ejemplo: "1 dia"';
    }

    if(!input.season) {
        errors.season = "Especifica en que temporada se realiza dicha actividad"
    }

    if(input.countries.length === 0) {
        errors.countries = "Debe seleccionar 1 o varios paises de la lista"
    }

    return errors;
}

const myImg = (img) => {
    if(img) {
        const cld = new Cloudinary({cloud: {cloudName: 'mauro4202214'}});
        const myImage = cld.image(img)
        return myImage;
    }
}

const ActivityDetail = (props) => {

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
        image: ""
    })

    const [errors, setErrors] = useState({
		name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
        image: ""
	});

    const [file, setFile] = useState("");
    const [nameFile, setNameFile] = useState("");

    
    
    const dispatch = useDispatch();
    const activity = useSelector((state) => state.activityDetail);
    const countries = useSelector((state) => state.countriesFiltered);
    const id = useRef(parseInt(props.match.params.id));
    const hiddenFileInput = useRef(null);

    const handleInput = (e) => {
        e.preventDefault();
        setErrors(validate({
			...input,
			[e.target.name]: e.target.value
		}))
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        e.preventDefault();
        const updatedOptions = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);
            setInput({
                ...input,
                countries: updatedOptions
            })
    }


    function previewFiles(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
            setInput({
                ...input,
                image: reader.result
            });
            console.log(reader.result);
        }
    }


    const handleImage = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setNameFile(file.name);
        setFile(file);
        previewFiles(file);
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(putActivity({
            ...input,
            id: id.current
        }))
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: [],
            image: '',
        })
    }

    useEffect(() => {
        dispatch(getActivity(id.current))
        dispatch(byOrder("Asc"));
    }, [dispatch, id])

    return(
        <div className={styles.container}>
            <div className={styles.infoActivityContainer}>
                <img src={infoActivity} alt="Pergamino" className={styles.pergamino}/>
                <div className={styles.infoActivity}>
                    {
                        activity ? <React.Fragment>
                                            <section className={styles.section1}>
                                                <label>Nombre de la actividad:</label>
                                                <p>{activity.name}</p>
                                                <label>Duración de la actividad:</label>
                                                <p>{activity.duration}</p>
                                                <label>Dificultad de la actividad:</label>
                                                <p>{activity.difficulty}</p>
                                                <label>Temporada para realizarla:</label>
                                                <p>{activity.season}</p>
                                            </section>
                                            <section className={styles.containerImg}>
                                                <label>Imagen ilustrativa:</label>
                                                <div>
                                                    {
                                                        activity.image ? <AdvancedImage cldImg={myImg(activity.image)} className={styles.actImg}/> : <ReactLoading type="spin" color="fff" height={100} width={100} />
                                                    }
                                                </div>
                                            </section>
                                            <section className={styles.sectionCountries}>
                                                <label>Paises donde se desarrolla:</label>
                                                <div className={styles.countriesNames}>
                                                    {
                                                        activity.name ? activity.countries.map(country =>
                                                                <p key={country.id}>{country.name}</p>
                                                        )
                                                        : <p>No hay paises asociados</p>
                                                    }
                                                </div>
                                            </section>
                                        </React.Fragment>
                        : <p>No hay info</p> 
                        
                    }
                </div>
            </div>
            <button onClick={() => dispatch(deleteActivity(id.current))} className={styles.btnDelete}>Borrar actividad</button>


            <form onSubmit={onSubmit}>
                <label>Modificar nombre de la actividad:</label>
                <input type="text" 
                       name="name"
                       onChange={handleInput}
                       required
                />
                {   
                    errors.name && (
                        <p className={styles.danger}>{errors.name}</p>
                    )
                }


                <div className={styles.inputFileContainer}>
                    <label>Modificar imagen de la actividad (opcional):</label>
                    <div className={styles.divFileContainer}>
                        <div className={styles.uploadImgContainer}>
                            <button onClick={handleClick} className={styles.btnUpload}>
                                <FaUpload/>
                            </button>
                            <span>{nameFile}</span>
                            <input type="file"
                                id="archivo" 
                                name="image"
                                onChange={handleImage}
                                required
                                ref={hiddenFileInput}
                                style={{display:'none'}}
                                accept="image/png, image/jpeg, image/gif, image/jpg, image/jfif"
                            />
                        </div>          
                        <div className={styles.previewImgContainer}>
                            <img src={input.image} className={styles.imgUpload} alt="Foto Subida"/>
                        </div>
                    </div>
                </div>

                <label>Modificar paises donde se practica esta actividad:</label>
                <select multiple required onChange={handleSelect}>
                    <option value="" hidden>Select country</option>
                    {
                    
                        countries.map(e => (
                                        <option value={e.id} name="countries" key={e.id} >{e.name}</option>
                                    )
                        )
                    }
                </select>
                {   
                    errors.countries && (
                        <p className={styles.danger}>{errors.countries}</p>
                    )
                }

                <label>Modificar dificultad de la actividad (1 a 5):</label>
                <input type="range" 
                       name="difficulty"
                       min="1"
                       max="5"
                       onChange={handleInput}
                       required
                />
                {   
                    errors.difficulty && (
                        <p className={styles.danger}>{errors.difficulty}</p>
                    )
                }
                <label>Modificar duración de la actividad:</label>
                <input type="text" 
                       name="duration"
                       onChange={handleInput}
                       required
                />
                {   
                    errors.duration && (
                        <p className={styles.danger}>{errors.duration}</p>
                    )
                }
                <label>Modificar la temporada donde se realiza la actividad:</label>
                <div className={styles.radio}>
                    <div className={styles.option}option>
                        <input type="radio" 
                               name="season" 
                               value="Verano"
                               onChange={handleInput}
                               required/>
                        <label>Verano</label>
                    </div>
                    <div className={styles.option}>
                        <input type="radio" 
                               name="season" 
                               value="Invierno"
                               onChange={handleInput}/>
                        <label>Invierno</label>
                    </div>
                    <div className={styles.option}>
                        <input type="radio" 
                               name="season" 
                               value="Otoño"
                               onChange={handleInput}/>
                        <label>Otoño</label>
                    </div>
                    <div className={styles.option}>
                        <input type="radio" 
                               name="season" 
                               value="Primavera"
                               onChange={handleInput}/>
                        <label>Primavera</label>
                    </div>
                </div>
                {   
                    errors.season && (
                        <p className={styles.danger}>{errors.season}</p>
                    )
                }

                <p>*En caso de modificar una propiedad, es necesario sobrescribir todos los campos</p>

                <div className={styles.buttons}>
                    {
                        errors.name || errors.duration || errors.season || errors.difficulty || errors.countries ? <button type="submit" disabled className={styles.btnModify}>Modificar</button> : <button type="submit" className={styles.btnModify}>Modificar</button>
                    }
                </div>
            </form>
        </div>
    )

}

export default ActivityDetail;