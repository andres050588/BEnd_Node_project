import { Sequelize } from "sequelize"

const sequelize = new Sequelize("elementary_Node_project_DB", "developerId", "pass1234", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
})

export const mysqlConnect = async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log(error)
        process.exit(1) //Ucidi l'app Node nel caso errore conessione al db
    }
}

export const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true })
    } catch (error) {
        console.log(error)
    }
}

export default sequelize
