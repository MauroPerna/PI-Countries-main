import React, {useEffect, useState}from 'react';
import styles from './CreateActivity.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {byOrder, postActivity} from '../../redux/actions/index';
import {FaUpload} from "react-icons/fa";

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



const CreateActivity = () => {

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

    const hiddenFileInput = React.useRef(null);


    const dispatch = useDispatch();
    let countries = useSelector((state) => state.countriesFiltered);

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
        dispatch(postActivity(input))
        setInput({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: [],
            image: ''
        })
    }

    useEffect(() => {
        dispatch(byOrder("Asc"));
    }, [dispatch])

    return(
        <div className={styles.container}>
            <form onSubmit={onSubmit}>
                <label>Nombre de la actividad:</label>
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
                    <label>Cargue una imagen ilustrativa (opcional):</label>
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
                            <img src={input.image} className={styles.imgUpload}/>
                        </div>
                    </div>
                </div>

                <label>Paises donde se practica esta actividad:</label>
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

                <label>Dificultad de la actividad (1 a 5):</label>
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
                <label>Duración de la actividad:</label>
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
                <label>Temporada para realizar la actividad:</label>
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
                <div className={styles.containerBtnCreate}>
                    {
                        errors.name || errors.duration || errors.season || errors.difficulty || errors.countries ? <button type="submit" disabled className={styles.btnCreate}>Crear</button> : <button type="submit" className={styles.btnCreate}>Crear</button>
                    }
                </div>
            </form>
        </div>
    )

}

export default CreateActivity;