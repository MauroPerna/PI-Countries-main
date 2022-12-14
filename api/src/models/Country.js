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
		lat: {
			type: DataTypes.FLOAT,
		},
		long: {
			type: DataTypes.FLOAT,
		},
		id: {
			type: DataTypes.STRING,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		}
	},{
		timestamps: false
	});
};
