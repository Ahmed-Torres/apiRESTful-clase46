const dataStore = require("../db/datastore")

module.exports.getAutores = function() {
    return dataStore.autores;
}

/* 

{
    id: 1,
    nombre: "",
    apellido: "",
    fechaDeNacimiento: 01/01/2020,
    libros: []
} 

*/
module.exports.crearAutor = function (autor){
    let buscarAutoresPorNombreYApellido = dataStore.autores
        .filter(r=> r.nombre == autor.nombre && r.apellido == autor.apellido)

    if(buscarAutoresPorNombreYApellido.length > 0){
        throw new Error("Ya existe un autor con ese nombre y apellido")
    }

    return dataStore.agregarAutor(autor)
}