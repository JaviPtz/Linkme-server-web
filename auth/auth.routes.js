const Users = require('./auth.controller');
const Clients = require('../controllers/client.controller')
const Chat = require('../dialowgflow/dialowgflow')

module.exports = (router) =>{
    //ruta para crear un usuario
    router.post('/register', Users.createUser)
    //ruta para logearse
    router.post('/login', Users.loginUser)
    //ruta para logearse
    router.post('/client', Clients.createClient)
    //ruta prueba
    router.post('/webhook', Chat.Chat)

}