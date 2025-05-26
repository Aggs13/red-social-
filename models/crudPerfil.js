const getCrud = require("./conexion")
const fs = require("fs")

exports.getPerfil = async(req,res)=>{
    try {
        const idSession = req.session.idUsuario
        const idUsuario = req.params.idUsuario
        const nombreUsuario = req.params.nombreUsuario
        const crud = await getCrud()
        const [post] = await crud.execute("SELECT * FROM post WHERE id_usuario_post = ? ORDER BY id_post DESC",[idUsuario])
        const [results] = await crud.execute("SELECT * FROM usuarios WHERE id_usuario = ?",[idUsuario])

        if (results[0].nombre_usuario !== nombreUsuario) {
            return res.send("Usuario no encontrado");
        }


        let amigo = []
        if(idSession){
            [amigo] = await crud.execute("SELECT * FROM amigos WHERE id_usuario_uno = ?  AND id_usuario_dos = ?",[idSession,idUsuario])
        }

        res.render("perfil",({post,nombreUsuario,idUsuario,idSession,amigo}))
    } catch (error) {
        console.log(error)
    }
}

exports.deletePost = async(req,res)=>{
    try {
        const nombreUsuario = req.params.nombreUsuario
        const idUsuario = req.params.idUsuario
        const idPost = req.params.idPost

        const crud = await getCrud()
        const [results] = await crud.execute("SELECT * FROM post WHERE id_post = ?",[idPost])

       const imgpath = results[0].contenido_img_post
        fs.unlink(imgpath,(error)=>{
            if(error){
                console.log(error)
            }else{
                console.log("se borro")
            }
        })

        await crud.execute("DELETE FROM post WHERE id_post = ?",[idPost])
        res.redirect("/perfil/"+nombreUsuario+"/"+idUsuario)
    } catch (error) {
        console.log(error)
    }
}


exports.enviarSolicitud = async(req,res)=>{
    try {
        const usuarioAct = req.session.idUsuario
        const perfilUsuario = req.params.idUsuario
        const estadoSolicitud = "pendiente"

        if(!req.session.idUsuario){
            return res.send("inicie sesion")
        }

        const crud = await getCrud()
        crud.execute("INSERT INTO amigos(id_usuario_uno,id_usuario_dos,estado) VALUES(?,?,?)",[usuarioAct,perfilUsuario,estadoSolicitud])
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}