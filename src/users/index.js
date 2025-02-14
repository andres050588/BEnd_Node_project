/*                          *****USERS CRUD*****

1. GET http://localhost:3001/users/ (opzionalmente query paramaters)
2. POST http://localhost:3001/users/ ( + request body)
3. GET http://localhost:3001/users/:userId
4. PUT http://localhost:3001/users/userId ( + request body)
5. DELETE http://localhost:3001/users/:userId (non dimenticare :userId)
*/

import express from "express"
import UserModel from "./model.js"
import validator from "validator"

const userRouter = express.Router()
const { isUUID } = validator

/**** -Endpoints- ****/
//1.
userRouter.get("/", async (request, response) => {
    const users = await UserModel.findAll()
    response.send(users)
})

//2.
userRouter.post("/", async (request, response) => {
    try {
        console.log("📩 Dati ricevuti:", request.body) // Controllo dei dati da inviare
        const { id } = await UserModel.create(request.body) // Inseriremo i dati come nuovo record nella tabella users

        response.status(201).send({ id })
    } catch (error) {
        console.error("❌ Errore durante la creazione dell'utente:", error)
        response.status(500).json({ error: "Errore nel server" })
    }
})

//3.
userRouter.get("/:userId", async (request, response) => {
    try {
        if (!isUUID(request.params.userId)) {
            return response.status(400).send({ error: "ID non valido" }) // Se l'ID non è un UUID
        }
        const id = request.params.userId
        const user = await UserModel.findByPk(id)
        if (!user) {
            return response.status(404).send({ error: "Utente non trovato" }) // Nel caso l'utente non esiste
        }

        response.send(user)
    } catch (error) {
        console.log("❌ Errore durante la request del utente tramite l'userId dell'utente:", error)
        response.status(500).json({ error: "Errore nel server" })
    }
})

//4.
userRouter.put("/:userId", async (request, response) => {
    try {
        const user = await UserModel.findByPk(request.params.userId) // Selezioniamo il utente

        if (!user) {
            return response.status(404).send({ error: "Utente non trovato" }) //Nel caso l'utente non esiste
        }

        await user.update(request.body) // Aggiornamento dei dati del utente
        response.send(user)
    } catch (error) {
        console.log("❌ Errore durante l'aggiornamento tramite l'userId dell'utente:", error)
        response.status(500).json({ error: "Errore nel server" })
    }
})

//5.
userRouter.delete("/:userId", async (request, response) => {
    try {
        if (!isUUID(request.params.userId, 4)) {
            //Controliamo se iil ID del utente e valido
            return response.status(400).json({ error: "ID non valido" })
        }
        const numeroUsersCancellati = await UserModel.destroy({ where: { id: request.params.userId } })
        response.status(204).send()
    } catch (error) {
        console.log("❌ Errore durante la cancellazione dell'utente:", error)
        response.status(500).json({ error: "Errore nel server" })
    }
})

export default userRouter
