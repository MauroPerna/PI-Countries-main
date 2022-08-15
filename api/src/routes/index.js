const express = require('express')
const router = express.Router()
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require('../routes/countries_route')
const activities = require('../routes/activities_route')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());
router.use('/countries', countries)
router.use('/activities', activities)


  

module.exports = router;
