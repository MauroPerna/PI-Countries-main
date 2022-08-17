//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require('axios');


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    axios.get('https://restcountries.com/v3/all')
    .then(response => {
        response.data.forEach(async (r)=> {
            await Country.create({
                name: r.translations.spa.common,
                img: r.flags[0],
                continent: r.continents[0],
                capital: r.capital ? r.capital[0] : `${r.name.common} no tiene capital`,
                subregion: r.subregion,
                area: r.area,
                population: r.population,
                map: r.maps.googleMaps,
                lat: r.latlng[0],
                long: r.latlng[1],
                id:r.cca3
			});
        });
    })
    .catch(error => {
      console.log(error);
    });
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
