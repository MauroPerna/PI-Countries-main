const express = require('express');
const activities = express.Router();
const { Activity, Country } = require('../db')
const cloudinary = require('../cloudinary');

activities.get('/', async (req, res) => {
    const activities = await Activity.findAll({
        include: Country
    })
    res.send(activities) 
})

activities.post('/', async (req, res) => {
    const {name, difficulty, duration, season, countries, image} = req.body;

    // cargamos la imagen a cloudinary
    const uploadImage = await cloudinary.uploader.upload(image,
            {
                upload_preset: 'gft7obfm', 
                public_id: `${name}image`,
                allowed_formats: ['png', 'jpg', 'jpeg', 'jfif', 'gif'] 
            }, 
            function(error, result) { 
                if(error) console.log(error);
                console.log(result); 
            });

    // countries debe ser un arreglo con identificadores ["ARG", "ETH", "MSR, etc]
    // Esto es porque la relacion se crea en CountryActivity y esta guarda 2 campos:
    // CountryId (ej: "ARG") y activityId (un numero ej: 1, 10, 104)


    let activity = await Activity.create({
        name: name,
        difficulty: parseInt(difficulty),
        duration: duration,
        season: season,
        image: uploadImage.public_id
    })

    await activity.setCountries(countries);

    const activityWithCountry = await Activity.findOne({ 
        where: {name: name},
        include: {
            model: Country,
            through: {
                attributes: []
            }
        }
    })

    res.send(activityWithCountry);
})

activities.delete('/', async (req, res) => {
    const {name} = req.query;


    const response = Activity.destroy({ 
        where: {name: name}
    })
    console.log(response);
    res.send(response);

})

module.exports = activities;