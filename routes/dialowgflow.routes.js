const Chat = require("../dialowgflow/dialowgflow");
const ClientController = require("../controllers/client.controller")

module.exports = (router) => {
  //ruta dialogflow
  router.post("/webhookChat", Chat.Chat /*, Chat.DataClients*/);

  //ruta clientes
  router.get("/client", ClientController.listClients)
  router.get("/client/:id", ClientController.showClient);
  router.put("/client/:id", ClientController.updateClients);
  router.delete("/client/:id", ClientController.deleteClients);
};

