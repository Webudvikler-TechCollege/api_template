// Import af dependencies
import { Sequelize } from 'sequelize'
import { config } from '../config/env'

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
	host: config.db.host,
	port: config.db.port,
	dialect: 'mysql',
	define: {
		charset: "utf8mb4",
		collate: "utf8mb4_unicode_ci",
	}
	}
)

export default sequelize