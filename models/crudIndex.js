const getCrud = require("./conexion")

exports.getInicio = async(req,res)=>{
    if(req.session.logeo){
        try {
            const idUsuario = req.session.idUsuario
            const crud =  await getCrud()
            const [results] = await crud.execute("SELECT * FROM usuarios WHERE id_usuario = ?",[idUsuario])
            const [post] = await crud.execute("SELECT post.id_post , post.id_usuario_post , post.titulo_img_post ,usuarios.nombre_usuario ,usuarios.id_usuario , post.contenido_texto_post , post.contenido_img_post , post.tipo_post , post.likes_post FROM post JOIN usuarios ON post.id_usuario_post = usuarios.id_usuario ORDER BY post.id_post DESC")
            const [solicitud] = await crud.execute("SELECT a.id_usuario_uno ,a.estado, u.nombre_usuario FROM amigos a JOIN usuarios u ON a.id_usuario_uno = u.id_usuario WHERE a.id_usuario_dos = ?",[idUsuario])
            const [amigos] = await crud.execute(`
            SELECT 
                u.id_usuario,
                u.nombre_usuario,
                a.id_amigos,
                a.estado
            FROM amigos a
            JOIN usuarios u 
                ON (u.id_usuario = a.id_usuario_uno AND a.id_usuario_dos = ?)
                OR (u.id_usuario = a.id_usuario_dos AND a.id_usuario_uno = ?)
            WHERE a.estado = 'amigos'
            `, [idUsuario, idUsuario]);

            const usuario = req.session.usuario
            const logeo = req.session.logeo

            res.render("index",{post,usuario,idUsuario,logeo,solicitud,amigos})
        } catch (error) {
            console.log(error)
        }
    }else{
        const results = []
        const amigos = []
        const solicitud = []
        const usuario = "invitado"
        const logeo = false
        const crud =  await getCrud()
        const [post] = await crud.execute("SELECT post.id_post , post.id_usuario_post , post.titulo_img_post , usuarios.nombre_usuario ,post.contenido_texto_post , post.contenido_img_post , post.tipo_post , post.likes_post FROM post JOIN usuarios ON post.id_usuario_post = usuarios.id_usuario ORDER BY post.id_post DESC")
        
        res.render("index",{post,results,usuario,logeo,solicitud,amigos})
    }
}



exports.aceptarSolicutud = async(req,res)=>{
    try {
        const idUsuario = req.session.idUsuario
        const idUsuarioAceptado = req.params.idUsuario
        const crud = await getCrud()
        
        await crud.execute("UPDATE amigos SET estado = ? WHERE id_usuario_uno = ? AND id_usuario_dos = ?",["amigos",idUsuarioAceptado,idUsuario])
       
        const [results] =  await crud.execute("SELECT id_amigos FROM amigos WHERE (id_usuario_uno = ? AND id_usuario_dos = ?) OR (id_usuario_dos = ? AND id_usuario_uno = ?) ",[idUsuarioAceptado,idUsuario,idUsuarioAceptado,idUsuario])
        const idAmigos = results[0].id_amigos
        await crud.execute("INSERT INTO chat (id_amigos_chat,id_usuario_emisor) VALUES (?,?)", [idAmigos,idUsuario]);
        await crud.execute("INSERT INTO chat (id_amigos_chat,id_usuario_emisor) VALUES (?,?)", [idAmigos,,idUsuarioAceptado]);
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}


exports.rechazarSolicitud = async(req,res)=>{
    try {
        const idUsuario = req.session.idUsuario
        const idUsuarioAceptado = req.params.idUsuario
        const crud = await getCrud()
        await crud.execute("DELETE FROM amigos  WHERE id_usuario_uno = ? AND id_usuario_dos = ?",[idUsuarioAceptado,idUsuario])
        res.redirect("/")
        
    } catch (error) {
        console.log(error)
    }
}