const { io } = require('../server');

const {Usuarios} = require('../classes/usuarios')

const { crearMensajes} = require('../utils/util')

const usuarios = new Usuarios()

io.on('connection', (client) => {


    client.on('entrarChat',(usuario,callback)=>{
        console.log(usuario)

        if(!usuario.nombre || !usuario.sala){
            return callback({
                error: true,
                mensaje: 'el nombre es necesario y la sala es necesaria'
            })
        }

        client.join(usuario.sala)

        let personas = usuarios.agregarPersona(client.id, usuario.nombre,usuario.sala)

        client.broadcast.to(usuario.sala).emit('listaPersona',usuarios.getPersonaPorSala(usuario.sala))
        callback(usuarios.getPersonaPorSala(usuario.sala))
    })

    client.on('crearMensaje',(data)=>{
        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensajes(persona.nombre,data.mensaje)
        client.broadcast.emit('crearMensaje',mensaje)


    })


    client.on('disconnect', ()=>{
       let personaBorrada = usuarios.borrarPersona(client.id)
       client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensajes('admin', `${personaBorrada} salio`))

       client.broadcast.to(personaBorrada.sala).emit('listaPersona',usuarios.getPersonaPorSala(personaBorrada.sala))


    })

    client.on('mensajePrivado',(data)=>{
        let persona = usuarios.getPersona(client.id)
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensajes(persona.nombre,data.mensaje))
    })

  

});