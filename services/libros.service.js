const dataStore = require("../db/datastore")
const autorService = require("../services/autor.service")

module.exports.nuevoLibro = function(idParams,libro){

    let resultadoAutor = autorService.getAutorById(idParams)
    let agregarLibro = dataStore.agregarLibro(libro, resultadoAutor)
    
    return agregarLibro
}

