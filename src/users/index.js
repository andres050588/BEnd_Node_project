import express from "express"
import UserModel from "./model.js"

/*                          *****USERS CRUD*****

1. GET http://localhost:3001/users/ (opzionalmente query paramaters)
2. POST http://localhost:3001/users/ ( + request body)
3. GET http://localhost:3001/users/:userId
4. PUT http://localhost:3001/users/userId ( + request body)
5. DELETE http://localhost:3001/users/:userId (non dimenticare :userId)

*/

const userRouter = express.Router()

//1.
userRouter.get("/", async (request, response) => {
    await UserModel.findAll()
    response.send(users)
    //rsresponse.json({ message: "Lista di tutti gli utenti" })
})

/*/2.
userRouter.post("/", (request, response) => {
    const newUser = request.body
    response.status(201).json({ message: "Utente creato ", user: newUser })
})

//3.
userRouter.get("/:userId", (request, response) => {
    response.json({ message: `Detagli dell'utente con ID: ${request.params.userId}` })
})

//4.
userRouter.put("/:userId", (request, response) => {
    response.json({ message: `Utente con ID ${request.params.userId} aggiornato`, uptatedData: request.body })
})

//5.
userRouter.delete("/:userId", (request, response) => {
    response.json({ message: `Utente con ID ${request.params.userId} eliminato` })
})
*/
export default userRouter
