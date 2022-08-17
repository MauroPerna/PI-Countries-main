const express = require('express');
const activities = express.Router();
const { Activity, Country } = require('../db')



activities.get('/', async (req, res) => {
    const activities = await Activity.findAll({
        include: Country
    })
    res.send(activities) 
})

activities.post('/',  async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;

    // countries debe ser un arreglo con identificadores ["ARG", "ETH", "MSR, etc]
    // Esto es porque la relacion se crea en CountryActivity y esta guarda 2 campos:
    // CountryId (ej: "ARG") y activityId (un numero ej: 1, 10, 104)


    let activity = await Activity.create({
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
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

module.exports = activities;