const express = require('express');
const countries = express.Router();
const { Country } = require('../db')
const {Op} = require('sequelize')

countries.get('/',  async (req, res) => {
    const {name, order, population, continent} = req.query;

    if(name) {
        try {
            const country = await Country.findAll({
                attributes: ['name', 'img', 'continent', 'id'],
                where: {
                    [Op.or]: [{ name: name }, { continent: name }]
                }
            })
            console.log(country)
            res.send(country)
        } catch (error) {
            res.status(404).send('No se encuentra ningun pais con dicho nombre')
        }
    } else if (order) {
        if(order === 'Asc') {
            const countries = await Country.findAll({
                order: [['name', 'ASC']]
            })
            res.send(countries)
        } else {
            const countries = await Country.findAll({
                order: [['name', 'DESC']]
            })
            res.send(countries)
        }
    } else if(population){
        if(population === 'Min') {
            const countries = await Country.findAll({
                order: [['population', 'ASC']]
            })
            res.send(countries)
        } else {
            const countries = await Country.findAll({
                order: [['population', 'DESC']]
            })
            res.send(countries)
        }
    } else if(continent){
        try {
            const countries = await Country.findAll({
                attributes: ['name', 'img', 'continent', 'id'],
                where: {
                    continent: continent
                }
            })
            res.send(countries)
        } catch (error) {
            res.status(404).send('No se encuentra ningun pais con dicho nombre')
        }
    }else {
        const countries = await Country.findAll({
            attributes: ['name', 'img', 'continent', 'id']
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