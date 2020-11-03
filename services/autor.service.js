const dataStore = require("../db/datastore")

module.exports.getAutores = function() {
    return dataStore.autores;
}

module.exports.getAutorById = function(autorById){
    let buscarAutorPorId = dataStore.autores.find(a=>a.id == autorById)
    if(buscarAutorPorId){
        return buscarAutorPorId   
    }else{
        throw new Error("No existe el autor que queres buscar :(")
    }

}


// -------falta resolver este delete-----
module.exports.deleteAutorById = function(borrameId){
    let buscarAutorById = dataStore.autores.find(a=>a.id == borrameId)
    console.log(buscarAutorById)
    let borrarAutor = buscarAutorById.id
    if(borrarAutor){
        let resultado = dataStore.autores.borrarAutor(borrarAutor)
        return resultado
    }else{
        throw new Error("No encuentro a la víctima :/")
    }
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