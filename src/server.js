import express from "express" //importazione tipo moderno in confronto con require('express')

const server = express() //Creazione applicazione express
const PORT = 3001 //Impostata la porta del server

server.use(express.json()) //Middleware per parsing del json

server.listen(PORT, () => {
    console.log(`Il server avviato 🚀 su http://localhost:${PORT}`) //Avvio del server
})
