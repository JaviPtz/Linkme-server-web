const Users = require("./auth.controller");
// clients
const Clients = require("../controllers/client.controller");
// works
const worksController = require("../controllers/work.controller");
const Chat = require("../dialowgflow/dialowgflow");

module.exports = (router) => {
  //ruta para crear un usuario
  router.post("/register", Users.createUser);
  //ruta para logearse
  router.post("/login", Users.loginUser);
  //ruta para cliente
  router.post("/client", Clients.createClient);

  //rutas para trabajos o proyectos (works)
  router.get("/work", worksController.listWorks);
  router.post("/work", worksController.fileUpload, 
  worksController.createWorks);
  router.get("/work/:id", worksController.showWorks);
  router.put("/work/:id", worksController.fileUpload, worksController.updateWorks);
  router.delete("/work/:id", worksController.deleteWorks);

  //ruta prueba
  router.post("/webhook", Chat.Chat);
};
