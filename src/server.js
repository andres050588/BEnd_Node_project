import express from "express" //importazione tipo moderno in confronto con require('express')
import userRouter from "./users/index.js"
import listEndpoints from "express-list-endpoints"
import { mysqlConnect, syncModels } from "./db.js"

const server = express() //Creazione applicazione express
const PORT = 3001 //Impostata la porta del server

server.use(express.json()) //Middleware per parsing del json

/*                              ***Endpoints****/
server.use("/users", userRouter)

const startServer = async () => {
    try {
        await mysqlConnect()
        console.log("✅ Connessione a MySQL riuscita!")

        await syncModels()
        console.log("✅ Database sincronizzato con i modelli!")

        server.listen(PORT, () => {
            console.table(listEndpoints(server)) // Rotte disponibili
            console.log(`Il server avviato 🚀 su http://localhost:${PORT}`) //Avvio del server
        })
    } catch (error) {
        console.error("❌ Errore durante l'avvio del server:", error)
        process.exit(1) // Uccide il processo in caso di errore
    }
}
startServer()
