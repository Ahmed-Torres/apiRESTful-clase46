// Libros{
//     id: 1,
//     titulos: "",
//     descripcion: "",
//     anioPublicacion: 2001
// }
// Rutas/Libros
// /autores/:id/libros
//     GET: Devuelve todos los libros de un autor.
//     POST: Agrega un nuevo libro al autor.
// /autores/:id/libros/:idLibro
//     GET: Devuelve el libro don el id indicado del autor.
//     POST: Modifica el libro don el id indicado del autor.
//     DELETE: Elimina el libro don el id indicado del autor.

const librosService = require("../services/libros.service")
const autorService = require("../services/autor.service")
const dataStore = require("../db/datastore")

    module.exports = function(server){

    server.get("/autores/:id/libros", (req,res)=>{
        let idParams = req.params.id
        try {
            let resultado = autorService.getAutorById(idParams)
            res.status(200).json(resultado.libros)
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    })

    server.post("/autores/:id/libros", (req,res)=>{
        let idParams = req.params.id
        let libro = req.body
        try {
            let libroNuevo = librosService.nuevoLibro(idParams,libro)
            res.status(201).json(libroNuevo)
        } catch (error) {
            res.status(404).json({error:error.message})
        }
    })

    server.get("/autores/:id/libros/:idLibro", (req,res)=>{
        let idAutor = req.params.id
        let idLibro = req.params.idLibro

        console.log(idAutor)
        console.log(idLibro)
    })

    server.post("/autores/:id/libros/:idLibro", (req,res)=>{
        
    })

    server.delete("/autores/:id/libros/:idLibro", (req,res)=>{
        
    })
}