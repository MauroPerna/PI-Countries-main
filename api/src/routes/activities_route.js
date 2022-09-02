const express = require('express');
const activities = express.Router();
const { Activity, Country } = require('../db')
const cloudinary = require('../cloudinary');

activities.get('/', async (req, res) => {
    const {id} = req.query

    if(id) {
        try {
            const activity = await Activity.findByPk(id, {
                include: Country
            })
            res.status(200).send(activity)
        } catch (error) {
            res.sendStatus(400)
        }
    } else {
        try {
            const activities = await Activity.findAll({
                include: Country
            })
            res.send(activities) 
        } catch (error) {
            res.sendStatus(400)
        }
    }

})

activities.post('/', async (req, res) => {
    const {name, difficulty, duration, season, countries, image} = req.body;


    try {
        // cargamos la imagen a cloudinary
        const uploadImage = await cloudinary.uploader.upload(image,
            {
                upload_preset: 'gft7obfm', 
                public_id: `${name}image:${Date.now()}`,
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

        res.status(200).send(activityWithCountry);
    } catch (error) {
        res.status(400).send(error)
    }

})

activities.delete('/', async (req, res) => {
    const {id} = req.query;

    const activity = await Activity.findByPk(id)
    const imgId = activity.dataValues.image

    await cloudinary.uploader.destroy(imgId);

    try {
        const response = await Activity.destroy({ 
            where: {id: id}
        })
        res.json({msg: "done"});
    } catch (error) {
        res.sendStatus(404);
    }

})


activities.put('/', async (req, res) => {
    const {name, difficulty, duration, season, countries, image, id} = req.body;

    console.log(id);

    // cargamos la imagen a cloudinary
    try {
        const uploadImage = await cloudinary.uploader.upload(image,
            {
                upload_preset: 'gft7obfm', 
                public_id: `${name}image:${Date.now()}`,
                allowed_formats: ['png', 'jpg', 'jpeg', 'jfif', 'gif'] 
            }, 
            function(error, result) { 
                if(error) console.log(error);
                console.log(result); 
            });
    
        const activity = await Activity.findByPk(id)
    
    
        await activity.update({
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
    } catch (error) {
        res.status(400).send(error);
    }
    



})

module.exports = activities;