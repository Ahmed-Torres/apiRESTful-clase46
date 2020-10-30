
// Rutas/Autores

// /autores
//     GET: Devuelve todos los autores. OK
//     POST: Crea un nuevo Autor.

// /autores/:id
//     GET: Devuelve el autor con el id indicado.
//     DELETE: Elimina el autor con el id indicado.
//     PUT: Modifica el autor con el id indicado.


const autorService = require("../services/autor.service")

module.exports = function (server) {
    
    server.get("/autores", (req,res)=>{
        let autores = autorService.getAutores();
        res.json(autores)
    })

    server.post("/autores", (req,res)=>{
        let autor = req.body
        try {
            let autorNuevo = autorService.crearAutor(autor);
            res.status("201").json(autorNuevo)
        } catch (err) {
            res.status(409).json({error: err.message})  
        }
    })
}