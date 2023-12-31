const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers/generar-jwt");
const { ChatMensajes} = require('../models')

const chatMensajes = new ChatMensajes();

const socketController = async(socket = new Socket(), io) =>{
    
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if(!usuario){
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes', chatMensajes.ultimos10);

    // Concetarlo a una sala especial
    socket.join(usuario.id);

    // Limpiar cuando un usuario se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuariosArr);
    })

    socket.on('enviar-mensaje', ({iud, mensaje}) =>{
        
        if( iud){
            // Mensaje Privado
            socket.to(iud).emit('mensaje-privado', { de: usuario.nombre, mensaje});
        }
        else{
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chatMensajes.ultimos10);
        }
        
    })


} 



module.exports ={
    socketController
}