const getCrud = require("./conexion")

exports.getChat = async(req,res)=>{
    try {

        if(!req.session.logeo){
            return res.send("inicie sesion")
        }

        const idUsuarioAct = req.session.idUsuario
        const nombreUsuarioAct = req.session.usuario
        const idChat = req.params.idChat

        const crud = await getCrud()
        const [idUsuarios] = await crud.execute("SELECT id_usuario_emisor FROM chat WHERE id_amigos_chat = ?",[idChat])

        const idUsuarioUno = idUsuarios[0].id_usuario_emisor
        const idUsuarioDos = idUsuarios[1].id_usuario_emisor
        
       const [nombres] = await crud.execute("SELECT id_usuario, nombre_usuario FROM usuarios WHERE id_usuario IN (?, ?)", [idUsuarioUno, idUsuarioDos])

        const [mensajes] = await crud.execute("SELECT mensaje_chat, id_usuario_emisor FROM chat WHERE id_amigos_chat = ?",[idChat])

        let nombreUno = nombres[0].nombre_usuario
        let nombreDos = nombres[1].nombre_usuario
        let nombreChat = ""

        if(nombreUsuarioAct == nombreUno){
            nombreChat = nombreDos
        }else{
            nombreChat = nombreUno
        }

        res.render("chat",{mensajes,nombreChat,idChat,idUsuarioUno,idUsuarioDos,idUsuarioAct,nombreUsuarioAct})

    } catch (error) {
        console.log(error)
    }
}


exports.postMensaje = async(req,res) => {
    try {
        
        const idUsuarioAct = req.session.idUsuario
        const contenidoMensaje = req.body.mensaje
        const idChat = req.params.idChat

        const crud = await getCrud()
        await crud.execute("INSERT INTO chat (id_amigos_chat,mensaje_chat,id_usuario_emisor)  VALUES (?,?,?)",[idChat,contenidoMensaje,idUsuarioAct])
        res.redirect("/chat/"+idChat)
    } catch (error) {
        console.log(error)
    }
}