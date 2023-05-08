import { DataSource } from "typeorm" 

export const mySqlClient = new DataSource({
    type: "mysql",
    host: "192.168.100.3",
    port: 4567,
    username: "kwonsungmin",
    password: "1234",
    database: "novastudy",
    synchronize: false,
    logging: false,
    entities: [
			"src/entity/*.ts"
		],
})