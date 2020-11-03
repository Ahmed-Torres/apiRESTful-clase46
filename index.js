/**
 * 
 * 
 * 
 * RestFull API (Autores)

La idea es armar una API que nos permita manejar y devolver al cliente Autores.

Autor{
    id: 1,
    nombre: "",
    apellido: "",
    fechaDeNacimiento: 01/01/2020,
    libros: []
}

Libros{
    id: 1,
    titulos: "",
    descripcion: "",
    anioPublicacion: 2001
}


 
Rutas/Libros

/autores/:id/libros
    GET: Devuelve todos los libros de un autor.
    POST: Agrega un nuevo libro al autor.

/autores/:id/libros/:idLibro
    GET: Devuelve el libro don el id indicado del autor.
    POST: Modifica el libro don el id indicado del autor.
    DELETE: Elimina el libro don el id indicado del autor.

Validaciones - Autores
    GET /autores
        Devuelve la lista de autores si hay alguno o un array vacío. OK
    POST /autores
        Si ya existe un autor con el mismo nombre y apellido, devuelve un 409. OK
        De lo contrario agrega el nuevo autor y devuelve 201 con el JSON correspondiente al autor. OK
    GET /autores/:id
        Si el autor no existe devuelve un 404
        De lo contrario devuelve 200 con el autor correspondiente
    PUT /autores/:id
        Si el autor no existe devuelve 404
        De lo contrario modifica el autor y devuelve 200 con el autor correspondiente
    DELETE /autores/:id
        Si el autor no existe devuelve 404
        De lo contrario elimina el autor y devuelve 204

Validaciones - Libros
    GET /autores/:id/libros
        Si el autor no existe devuelve 404
        Si el autor no tiene ningún libro devuelve 200 con un array vacío
        Caso contrario devuelve 200 con la lista de libros del autor
    POST /autores/:id/libros
        Si el autor no existe devuelve 404
        De lo contrario agrega el libro de autor y devuelve 201 con el libro agregado
    GET /autores/:id/libros/:idLibro
        Si el autor no existe devuelve 404
        Si el libro no existe devuelve 404
        Caso contrario devuelve 200 con el libro correspondiente
    PUT /autores/:id/libros/:idLibro
        Si el autor no existe devuelve 404
        Si el libro no existe devuelve 404
        De lo contrario modifica el libro y devuelve 200 con el libro modificado
    DELETE /autores/:id/libros/:idLibro
        Si el autor no existe devuelve 404
        Si el libro no existe devuelve 404
        De lo  contrario elimina el libro y devuelve 204

*/
const autorRoute = require("./routes/autor.route")
const librosRoute =require("./routes/libros.route")
const express = require("express")
const jwt = require("jsonwebtoken")
const firma = "SECRETO"
const server = express()
server.use(express.json())

server.get("/ping",(req, res)=>{

    res.headersSent
    res.send("pong")
})

autorRoute(server)
librosRoute(server)

server.use((err,req,res,next)=>{

    if(err){
        console.log(err)
        if(!res.headersSent){
            res.status(500).send("Error en el servidor: " + err.message)
        }   
    }
    next()
})
//-------autenticacion y autorizacion con jwt----------------//

var usuarios = [
    {
        id: 1,
        userName: "yamilt",
        nombre: "Yamil",
        password: "1234",
        roles: [
            "ADMIN",
            "NORMAL_USER"
        ]
    },
    {
        id: 2,
        userName: "normal",
        nombre: "normal",
        password: "123asd",
        roles: [
            "NORMAL_USER"
        ]
    }
]

server.post("/login", (req,res)=>{
    let user = req.body
    let findUser = usuarios.find(r => r.id == user.id)

    if(!findUser){
        res.status(400).json({
            message: "invalid user or password"
        })
    }

//claims el pedazito de codigo siguiente, asi lo vamos a conocer o ver 
    let payLoad = {
        id: findUser.id,
        nombre: findUser.nombre
    }
    

    let token = jwt.sign(payLoad, firma)

    res.status(200).send(token) 
})


let autorizar = (rolesRequeridos) => (req,res,next) => {
    let token = req.headers["authorization"].split(" ")[1]
    console.log(token)
    let user = null
    
    try {
        user = jwt.verify(token, firma)    
    } catch (error) {
        res.status(401).send("eh, que hace?")
        return;
    }
    
    let findUser = usuarios.find(r => r.id == user.id)
    let tieneRol = false

    if(rolesRequeridos && rolesRequeridos.length != 0){
        for (let i = 0; i < rolesRequeridos.length; i++) {
            const rol = rolesRequeridos[i];
            if(findUser.roles.includes(rol)){
                tieneRol = true
            }
        }
        if(!tieneRol){
            res.status(401).send("eh, que hace?")
            return;
        }
    }
    console.log(user)

    next()
}

server.get("/abierto",(req,res)=>{
    res.send("Todo ok")
})

server.get("/normal_user", autorizar(),(req,res)=>{
    res.send("Hola, solo podes leer esto si estás logeado")
})

server.get("/cerrado", autorizar(["ADMIN"]),(req,res)=>{
    res.send("Hola, solo podes leer esto si estás logeado")
})



//-------------------------------------//
server.listen(3000, ()=>{
    console.log("server on")
})