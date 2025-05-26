const express = require("express")
const router = express.Router()

const crud = require("../models/crudPerfil")

router.get("/enviar_solicitud/:idUsuario",crud.enviarSolicitud)
router.get("/:nombreUsuario/:idUsuario/eliminar/:idPost",crud.deletePost)

router.get("/:nombreUsuario/:idUsuario",crud.getPerfil)


module.exports = router