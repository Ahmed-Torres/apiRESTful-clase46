const fs = require("fs")


module.exports.getUser = async (id) => {
    return new Promise( r => {
        let data = JSON.parse(fs.readFileSync("./repository/user.txt").toString())
        r(data.find(r => id == r.id))
    })
}

module.exports.autenticarUser = async (username,password) => {
    return new Promise(r => {
        let data = JSON.parse(fs.readFileSync("./repository/user.txt").toString())

        r(data
            .find(user => username == user.userName && user.password == password))
    })
}

module.exports.findUserByUserName = async (username) => {
    return new Promise(r => {
        let data = JSON.parse(fs.readFileSync("./repository/user.txt").toString())

        r(data
        .find(user => username == user.userName))
    })
}

module.exports.registrarUser = async payload => {
    return new Promise (async r => {
        let user = await this.findUserByUserName(payload.username)

        if (user){
            throw new Error("El usuario ya existe")
        }

        let data = JSON.parse(fs.readFileSync("./repository/user.txt").toString())

        payload.roles = ["NORMAL_USER"]

        data.push(payload)

        fs.writeFileSync("./repository/user.txt", JSON.stringify(data))
    })
}