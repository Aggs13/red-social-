const express = require("express")
const router = express.Router()


module.exports = (upload)=>{
// chat
const chatRouter = require("./chat")
router.use("/chat",chatRouter)

// perfil
const perfilRouter = require("./perfil")
router.use("/perfil",perfilRouter)

// acceder
const accederRouter = require("./acceder")
router.use("/acceder",accederRouter)

// publicaciones amigos
const publicAmigosRouter = require("./publicAmigos")
router.use("/publicaciones",publicAmigosRouter)

// Index
const indexRouter = require("./index")(upload)
router.use("/",indexRouter)

return router
}