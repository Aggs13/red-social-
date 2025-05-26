const express = require("express")
const router = express.Router()
const crud = require("../models/crudAcceder")
router.get("/",(req,res)=>{
    let mostrarMensaje = false
    res.render("acceder",{mensaje:"Usuario y/o contraseña incorrectas",mostrarMensaje})
})

router.post("/registrar",crud.postUsuario)
router.post("/iniciar",crud.iniciarSesion)
module.exports = router