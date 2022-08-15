const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('country', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		img: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		continent: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		capital: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subregion: {
			type: DataTypes.STRING
		},
		area: {
			type: DataTypes.FLOAT,
		},
		population: {
			type: DataTypes.INTEGER,
		},
		map: {
			type: DataTypes.STRING,
		},
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		}
	},{
		timestamps: false
	});
};
