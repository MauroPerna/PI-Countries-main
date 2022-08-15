const { DataTypes, Op } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('activity', {
		name: {
			type: DataTypes.STRING,
		},
		difficulty: {
			type: DataTypes.INTEGER,
			where: {
				[Op.between]: [1, 5]
			}
		},
		duration: {
			type: DataTypes.STRING
		},
		season: {
			type: DataTypes.ENUM(["Verano", "Otoño", "Invierno", "Primavera"]),
		},
	}, {
		timestamps: false
	});
};