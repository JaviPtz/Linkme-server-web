const Users = require('./auth.controller');
module.exports = (router) =>{
    //ruta para crear un usuario
    router.post('/register', Users.createUser)
    //ruta para logearse
    router.post('/login', Users.loginUser)
}