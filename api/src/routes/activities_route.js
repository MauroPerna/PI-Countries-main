const express = require('express');
const activities = express.Router();
const { Activity, Country } = require('../db')



activities.post('/',  async (req, res) => {
    const {name, difficulty, duration, season, countries} = req.body;


    const obj = {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season
    }
    await Activity.create(obj)

    // ya creamos la actividad falta hacer la asociacion entre la actividad y los paises.
})

module.exports = activities;