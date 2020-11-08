
fetch("./users").then(async r =>{
    let usuariosContenedor = document.getElementById("usuarios")
    let users = await r.json()
    
    let result = ""
    for (let i = 0; i < users.length; i++) {
        const element = users[i];
        result += `<h1>${element.nombre}<h1>`

        usuariosContenedor.innerHTML = result
        
    }
})