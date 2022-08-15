const express = require('express');
const countries = express.Router();
const { Country } = require('../db')

countries.get('/',  async (req, res) => {
    const {name} = req.query;

    if(name) {
        try {
            const country = await Country.findAll({
                attributes: ['name'],
                where: {name: name}
            })
            console.log(country)
            res.send(country)
        } catch (error) {
            res.status(404).send('No se encuentra ningun pais con dicho nombre')
        }
    } else {
        const countries = await Country.findAll({
            attributes: ['name']
        })
        res.send(countries)
    }
})

countries.get('/:id',  async (req, res) => {
    const {id} = req.params;

    const country = await Country.findAll({
        attributes: ['name'],
        where: {id: id}
    })

    res.send(country)
})

module.exports = countries;