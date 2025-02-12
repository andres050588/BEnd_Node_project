import { DataTypes } from "sequelize"
import sequelize from "../db.js"

const UserModel = sequelize.define("user", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // db pensa in autonomia di crearmi un id per ogni utente creato
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cognome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    eta: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nazionalita: {
        type: DataTypes.STRING(2),
        allowNull: false
    }
})

export default UserModel
